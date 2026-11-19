
import { Inject, Injectable } from '@nestjs/common';
import neo4j, { Driver } from 'neo4j-driver';
import { Animal } from './animals.entity.js';
import { CreateAnimalDto } from './dto/create-animal.dto.js';
import { UpdateAnimalDto } from './dto/update-animal.dto.js';

@Injectable()
export class AnimalsRepository {
  constructor(
    @Inject('NEO4J_DRIVER')
    private readonly driver: Driver,
  ) {}

  async findAll(): Promise<Animal[]> {
    const session = this.driver.session({
  database: 'animalbase',
});

    try {
      const result = await session.run(`
        MATCH (a:Animal)
        RETURN a
      `);

      return result.records.map(record =>
        this.mapAnimal(record.get('a').properties),
      );
    } finally {
      await session.close();
    }
  }

  async findOne(id: number): Promise<Animal | null> {
    const session = this.driver.session({
    database: 'animalbase',
  });

    try {
      const result = await session.run(
        `
        MATCH (a:Animal {id: $id})
        RETURN a
        `,
        { id },
      );

      if (result.records.length === 0) {
        return null;
      }

      return this.mapAnimal(
        result.records[0].get('a').properties,
      );
    } finally {
      await session.close();
    }
  }

  

async create(dto: CreateAnimalDto): Promise<Animal> {
  const session = this.driver.session({
    database: 'animalbase',
  });

  try {
    const result = await session.executeWrite(async (tx) => {
      const created = await tx.run(
        `
        MERGE (c:Counter {name: 'Animal'})
        ON CREATE SET c.value = 0
        SET c.value = c.value + 1
        WITH c.value AS newId

        CREATE (a:Animal {
          id: newId,
          name: $name,
          type: $type,
          desc: $desc,
          age: $age,
          star: $star,
          winner: $winner
        })
        RETURN a
        `,
        {
          name: dto.name,
          type: dto.type,
          desc: dto.desc,
          age: dto.age,
          star: dto.star,
          winner: dto.winner,
        },
      );

      return created.records[0].get('a').properties;
    });

    return this.mapAnimal(result);
  } finally {
    await session.close();
  }
}



  async update(
    id: number,
    dto: UpdateAnimalDto,
  ): Promise<Animal | null> {
    const session = this.driver.session({
    database: 'animalbase',
  });

    try {
      const properties = Object.fromEntries(
        Object.entries(dto).filter(
          ([, value]) => value !== undefined,
        ),
      );

      const result = await session.run(
        `
        MATCH (a:Animal {id: $id})
        SET a += $properties
        RETURN a
        `,
        { id, properties },
      );

      if (result.records.length === 0) {
        return null;
      }

      return this.mapAnimal(
        result.records[0].get('a').properties,
      );
    } finally {
      await session.close();
    }
  }

  async delete(id: number): Promise<boolean> {
    const session = this.driver.session({
    database: 'animalbase',
  });

    try {
      const result = await session.run(
        `
        MATCH (a:Animal {id: $id})
        WITH a, a.id AS deletedId
        DETACH DELETE a
        RETURN deletedId
        `,
        { id },
      );

      return result.records.length > 0;
    } finally {
      await session.close();
    }
  }

  private mapAnimal(properties: any): Animal {
    return {
      ...properties,
      age: neo4j.isInt(properties.age)
        ? properties.age.toNumber()
        : properties.age,
        id: neo4j.isInt(properties.id)
  ? properties.id.toNumber()
  : properties.id,
    };
  }
}
