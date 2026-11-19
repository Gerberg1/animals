import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AnimalsModule } from './animals/animals.module.js';
import { Neo4jModule } from './database/neo4j.module.js';

@Module({
  imports: [
    Neo4jModule,
    AnimalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}