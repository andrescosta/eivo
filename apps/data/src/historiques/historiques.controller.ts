import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { HistoriquesService } from './historiques.service';
import { Historique } from '../entities/historique.entity';
import { LvHistorique } from '@lingv/contracts';
import { MapInterceptor } from '@automapper/nestjs';

@Controller('historiques')
export class HistoriquesController {
  constructor(private readonly historiquesService: HistoriquesService) {}

  @Post()
  @UseInterceptors(MapInterceptor(LvHistorique, Historique))
  async create(@Body() historique: Historique): Promise<Historique> {
    return this.historiquesService.create(historique);
  }

  @Get()
  @UseInterceptors(MapInterceptor(Historique, LvHistorique))
  async findAll(): Promise<Historique[]> {
    return this.historiquesService.findAll();
  }

  @Get(':id')
  @UseInterceptors(MapInterceptor(Historique, LvHistorique))
  async findOne(@Param('id') id: string): Promise<Historique | null> {
    return this.historiquesService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(MapInterceptor(LvHistorique, Historique))
  async update(@Param('id') id: string, @Body() historique: Historique): Promise<void> {
    return this.historiquesService.update(+id, historique);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.historiquesService.remove(+id);
  }
}
