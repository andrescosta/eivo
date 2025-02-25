import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { DomainesService } from './domaines.service';
import { Domaine } from '../entities/domain.entity';
import { LvDomaine } from '@lingv/contracts';
import { MapInterceptor } from '@automapper/nestjs';

@Controller('domaines')
export class DomainesController {
  constructor(private readonly domainesService: DomainesService) {}

  @Post()
  @UseInterceptors(MapInterceptor(LvDomaine, Domaine))
  async create(@Body() domaine: Domaine): Promise<Domaine> {
    return this.domainesService.create(domaine);
  }

  @Get()
  @UseInterceptors(MapInterceptor(Domaine, LvDomaine))
  async findAll(): Promise<Domaine[]> {
    return this.domainesService.findAll();
  }

  @Get(':id')
  @UseInterceptors(MapInterceptor(Domaine, LvDomaine))
  async findOne(@Param('id') id: string): Promise<Domaine | null> {
    return this.domainesService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(MapInterceptor(LvDomaine, Domaine))
  async update(@Param('id') id: string, @Body() domaine: LvDomaine): Promise<void> {
    return this.domainesService.update(id, new Domaine());
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.domainesService.remove(id);
  }
}
