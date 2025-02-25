import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { LocatairesService } from './locataires.service';
import { Locataire } from '../entities/locataire.entity';
import { LvLocataire } from '@lingv/contracts';
import { MapInterceptor } from '@automapper/nestjs';

@Controller('locataires')
export class LocatairesController {
  constructor(private readonly locatairesService: LocatairesService) {}

  @Post()
  @UseInterceptors(MapInterceptor(LvLocataire, Locataire))
  async create(@Body() locataire: Locataire): Promise<Locataire> {
    return this.locatairesService.create(locataire);
  }

  @Get()
  @UseInterceptors(MapInterceptor(Locataire, LvLocataire))
  async findAll(): Promise<Locataire[]> {
    return this.locatairesService.findAll();
  }

  @Get(':id')
  @UseInterceptors(MapInterceptor(Locataire, LvLocataire))
  async findOne(@Param('id') id: string): Promise<Locataire | null> {
    return this.locatairesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() locataire: LvLocataire): Promise<void> {
    return this.locatairesService.update(id, new Locataire());
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.locatairesService.remove(id);
  }
}
