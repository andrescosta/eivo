import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { JeuxService } from './jeux.service';
import { Jeu } from '../entities/jeu.entity';
import { LvJeu } from '@lingv/contracts';
import { MapInterceptor } from '@automapper/nestjs';

@Controller('jeux')
export class JeuxController {
  constructor(private readonly jeuxService: JeuxService) {}

  @Post()
  @UseInterceptors(MapInterceptor(LvJeu, Jeu))
  async create(@Body() jeu: Jeu): Promise<Jeu> {
    return this.jeuxService.create(jeu);
  }

  @Get()
  @UseInterceptors(MapInterceptor(Jeu, LvJeu))
  async findAll(): Promise<Jeu[]> {
    return this.jeuxService.findAll();
  }

  @Get(':id')
  @UseInterceptors(MapInterceptor(Jeu, LvJeu))
  async findOne(@Param('id') id: string): Promise<Jeu | null> {
    return this.jeuxService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(MapInterceptor(LvJeu, Jeu))
  async update(@Param('id') id: string, @Body() jeu: LvJeu): Promise<void> {
    return this.jeuxService.update(id, new Jeu());
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.jeuxService.remove(id);
  }
}
