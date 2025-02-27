import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { ActivitesService } from './activites.service';
import { LvActivite } from '@lingv/contracts';
import { Activite } from '../entities/activite.entity';
import { MapInterceptor } from '@automapper/nestjs';

@Controller('activites')
export class ActivitesController {
  constructor(private readonly activitesService: ActivitesService) {}

  @Post()
  @UseInterceptors(MapInterceptor(LvActivite, Activite))
  async create(@Body() activite: Activite): Promise<Activite> {
    return this.activitesService.create(activite);
  }

  @Get()
  @UseInterceptors(MapInterceptor(Activite, LvActivite))
  findAll() {
    return this.activitesService.findAll();
  }

  @Get(':id')
  @UseInterceptors(MapInterceptor(Activite, LvActivite))
  findOne(@Param('id') id: string) {
    return this.activitesService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(MapInterceptor(LvActivite, Activite))
  update(@Param('id') id: string, @Body() activite: Activite) {
    return this.activitesService.update(id, activite);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activitesService.remove(id);
  }
}
