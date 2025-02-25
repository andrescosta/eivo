import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { TopiquesService } from './topiques.service';
import { Topique } from '../entities/topique.entity';
import { LvTopique } from '@lingv/contracts';
import { MapInterceptor } from '@automapper/nestjs';

@Controller('topiques')
export class TopiquesController {
  constructor(private readonly topiquesService: TopiquesService) {}

  @Post()
  @UseInterceptors(MapInterceptor(LvTopique, Topique))  
  async create(@Body() topique: Topique): Promise<Topique> {
    return this.topiquesService.create(topique);
  }

  @Get()
  @UseInterceptors(MapInterceptor(Topique, LvTopique))
  async findAll(): Promise<Topique[]> {
    return this.topiquesService.findAll();
  }

  @Get(':id')
  @UseInterceptors(MapInterceptor(Topique, LvTopique))
  async findOne(@Param('id') id: string): Promise<Topique | null> {
    return this.topiquesService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(MapInterceptor(LvTopique, Topique))
  async update(@Param('id') id: string, @Body() topique: LvTopique): Promise<void> {
    return this.topiquesService.update(id, new Topique());
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.topiquesService.remove(id);
  }
}
