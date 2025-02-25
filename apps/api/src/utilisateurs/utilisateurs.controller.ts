import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { UtilisateursService } from './utilisateurs.service';
import { LvUtilisateur  } from '@lingv/contracts';
import { Utilisateur } from '../entities/utilisateur.entity';
import { MapInterceptor } from '@automapper/nestjs';

@Controller('utilisateurs')
export class UtilisateursController {
  constructor(private readonly utilisateursService: UtilisateursService) {}

  @Post()
  @UseInterceptors(MapInterceptor(LvUtilisateur, Utilisateur))  
  async create(@Body() utilisateur: Utilisateur): Promise<Utilisateur> {
    return this.utilisateursService.create(utilisateur);
  }

  @Get()
  async findAll():Promise<Utilisateur[]> {
    return this.utilisateursService.findAll();
  }

  @Get(':id')
  @UseInterceptors(MapInterceptor(Utilisateur, LvUtilisateur))  
  async findOne(@Param('id') id: string): Promise<Utilisateur | null> {
    return this.utilisateursService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(MapInterceptor(LvUtilisateur, Utilisateur))  
  async update(@Param('id') id: string, @Body() utilisateur: Utilisateur): Promise<void> {
    return this.utilisateursService.update(+id, utilisateur);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.utilisateursService.remove(+id);
  }
}
