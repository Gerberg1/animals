import { Module } from '@nestjs/common';
import { AnimalsController } from './animals.controller.js';
import { AnimalsService } from './animals.service.js';
import { AnimalsRepository } from './animals.repository.js';

@Module({
  controllers: [AnimalsController],
  providers: [
    AnimalsService,
    AnimalsRepository,
  ],
})
export class AnimalsModule {}