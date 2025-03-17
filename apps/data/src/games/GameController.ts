import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, NotFoundException } from '@nestjs/common';
import { GameService } from './GameService';
import { Game } from '../entities/Game';
import { LvGame } from '@lingv/contracts';
import { MapInterceptor } from '@automapper/nestjs';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { EntityNotFoundError } from '../entities/EntityNotFoundError';

@Controller('jeux')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  @UseInterceptors(MapInterceptor(Game, LvGame))
  @UseInterceptors(MapInterceptor(LvGame, Game))
  @ApiResponse({ type: LvGame })
  @ApiBody({ type: LvGame })
  async create(@Body() utilisateur: Game): Promise<Game> {
    return await this.gameService.create(utilisateur);
  }

  @Get()
  @ApiResponse({ type: LvGame, isArray: true })
  @UseInterceptors(
    MapInterceptor(Game, LvGame, { isArray: true }),
  )
  async findAll(): Promise<Game[]> {
    return this.gameService.findAll();
  }

  @Get(':id')
  @UseInterceptors(MapInterceptor(Game, LvGame))
  @ApiResponse({ type: LvGame, isArray: false })
  async findOne(@Param('id') id: string): Promise<Game | null> {
    return this.gameService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(MapInterceptor(LvGame, Game))
  @ApiBody({ type: LvGame })
  async update(
    @Param('id') id: string,
    @Body() utilisateur: Game,
  ): Promise<Game> {
    try {
      return this.gameService.update(+id, utilisateur);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      this.gameService.remove(+id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
