
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateAnimalDto } from './dto/create-animal.dto.js';
import { UpdateAnimalDto } from './dto/update-animal.dto.js';
import { Animal } from './animals.entity.js';
import { AnimalsRepository } from './animals.repository.js';

@Injectable()
export class AnimalsService {
  constructor(
    private readonly animalsRepository: AnimalsRepository,
  ) {}

  async findAll(): Promise<Animal[]> {
    return this.animalsRepository.findAll();
  }

  async findOne(id: number): Promise<Animal> {
    const animal = await this.animalsRepository.findOne(id);

    if (!animal) {
      throw new NotFoundException('Animal not found');
    }

    return animal;
  }

  async create(dto: CreateAnimalDto): Promise<Animal> {
    return this.animalsRepository.create(dto);
  }

  async update(
    id: number,
    dto: UpdateAnimalDto,
  ): Promise<Animal> {
    const animal = await this.animalsRepository.update(id, dto);

    if (!animal) {
      throw new NotFoundException(
        `Animal with ID ${id} not found`,
      );
    }

    return animal;
  }

  async delete(id: number): Promise<void> {
    const deleted = await this.animalsRepository.delete(id);

    if (!deleted) {
      throw new NotFoundException(
        `Animal with ID ${id} not found`,
      );
    }
  }
}
