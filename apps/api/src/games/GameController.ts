import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, NotFoundException } from '@nestjs/common';
import { GameService } from './GameService';
import { Game } from '../entities/Game.entity';
import { GameData } from '@eivo/contracts';
import { MapInterceptor } from '@automapper/nestjs';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { EntityNotFoundError } from '../entities/EntityNotFoundError';

@Controller('jeux')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  @UseInterceptors(MapInterceptor(Game, GameData))
  @UseInterceptors(MapInterceptor(GameData, Game))
  @ApiResponse({ type: GameData })
  @ApiBody({ type: GameData })
  async create(@Body() utilisateur: Game): Promise<Game> {
    return await this.gameService.save(utilisateur);
  }

  @Get()
  @ApiResponse({ type: GameData, isArray: true })
  @UseInterceptors(
    MapInterceptor(Game, GameData, { isArray: true }),
  )
  async findAll(): Promise<Game[]> {
    return this.gameService.findAll();
  }

  @Get(':id')
  @UseInterceptors(MapInterceptor(Game, GameData))
  @ApiResponse({ type: GameData, isArray: false })
  async findOne(@Param('id') id: string): Promise<Game | null> {
    return this.gameService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(MapInterceptor(GameData, Game))
  @ApiBody({ type: GameData })
  async update(
    @Param('id') id: string,
    @Body() utilisateur: Game,
  ): Promise<Game> {
    try {
      return this.gameService.save(utilisateur);
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
