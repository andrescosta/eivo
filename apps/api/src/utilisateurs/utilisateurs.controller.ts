import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { UtilisateursService } from './utilisateurs.service';
import { LvUtilisateur  } from '@lingv/contracts';
import { Utilisateur } from '../entities/utilisateur.entity';
import { MapInterceptor } from '@automapper/nestjs';

@Controller('utilisateurs')
export class UtilisateursController {
  constructor(private readonly utilisateursService: UtilisateursService) {}

  @Post()
  create(@Body() utilisateur: LvUtilisateur) {
    const u = new Utilisateur();
    return this.utilisateursService.create(u);
  }

  @Get()
  findAll() {
    const us= this.utilisateursService.findAll();
    const l: LvUtilisateur[] = [];
    return l
  }

  @Get(':id')
  @UseInterceptors(MapInterceptor(Utilisateur, LvUtilisateur))  
  findOne(@Param('id') id: string) {
    return this.utilisateursService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() utilisateur: LvUtilisateur) {
    return this.utilisateursService.update(+id, new Utilisateur());
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.utilisateursService.remove(+id);
  }
}
