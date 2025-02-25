import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { Classe } from '../entities/classe.entity';
import { LvClasse } from '@lingv/contracts';
import { MapInterceptor } from '@automapper/nestjs';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  @UseInterceptors(MapInterceptor(LvClasse, Classe))
  async create(@Body() classe: Classe): Promise<Classe> {
    return this.classesService.create(classe);
  }

  @Get()
  @UseInterceptors(MapInterceptor(Classe, LvClasse))
  async findAll(): Promise<Classe[]> {
    return this.classesService.findAll();
  }

  @Get(':id')
  @UseInterceptors(MapInterceptor(Classe, LvClasse))
  async findOne(@Param('id') id: string): Promise<Classe | null> {
    return this.classesService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(MapInterceptor(LvClasse, Classe))
  async update(@Param('id') id: string, @Body() classe: LvClasse): Promise<void> {
    return this.classesService.update(id, new Classe());
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.classesService.remove(id);
  }
}
