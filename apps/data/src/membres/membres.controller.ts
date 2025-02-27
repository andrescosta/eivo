import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { MembresService } from './membres.service';
import { Membre } from '../entities/membre.entity';
import { LvMembre } from '@lingv/contracts';
import { MapInterceptor } from '@automapper/nestjs';

@Controller('membres')
export class MembresController {
  constructor(private readonly membresService: MembresService) {}

  @Post()
  @UseInterceptors(MapInterceptor(LvMembre, Membre))
  async create(@Body() membre: Membre): Promise<Membre> {
    return this.membresService.create(membre);
  }

  @Get()
  @UseInterceptors(MapInterceptor(Membre, LvMembre))
  async findAll(): Promise<Membre[]> {
    return this.membresService.findAll();
  }

  @Get(':id')
  @UseInterceptors(MapInterceptor(Membre, LvMembre))
  async findOne(@Param('id') id: string): Promise<Membre | null> {
    return this.membresService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(MapInterceptor(LvMembre, Membre))
  async update(@Param('id') id: string, @Body() membre: Membre): Promise<void> {
    return this.membresService.update(+id, membre);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.membresService.remove(+id);
  }
}
