import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { AnimalsService } from './animals.service.js'
import { CreateAnimalDto } from "./dto/create-animal.dto.js"
import { UpdateAnimalDto } from "./dto/update-animal.dto.js"

@Controller('animals')
export class AnimalsController {

    constructor(private readonly animalsService: AnimalsService) {}

    @Get()
    findAll() {
        return this.animalsService.findAll()
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return  this.animalsService.findOne(id)
    }

    @Post()
    create(@Body(ValidationPipe) createAnimalDto: CreateAnimalDto){
        return this.animalsService.create(createAnimalDto)
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) animalUpdateDto: UpdateAnimalDto) {
        return  this.animalsService.update(id, animalUpdateDto)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return  this.animalsService.delete(id)
    }

    


}
