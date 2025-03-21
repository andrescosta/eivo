import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, NotFoundException } from '@nestjs/common';
import { LClassService } from './LClassService';
import { Curriculum } from '../entities/Curriculum.entity';
import { LvClass } from '@lingv/contracts';
import { MapInterceptor } from '@automapper/nestjs';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { EntityNotFoundError } from '../entities/EntityNotFoundError.entity';

@Controller('classes')
export class LClassController {
  constructor(private readonly lclassService: LClassService) {}

  @Post()
  @UseInterceptors(MapInterceptor(Curriculum, LvClass))
  @UseInterceptors(MapInterceptor(LvClass, Curriculum))
  @ApiResponse({ type: LvClass })
  @ApiBody({ type: LvClass })
  async create(@Body() lclass: Curriculum): Promise<Curriculum> {
    return this.lclassService.create(lclass);
  }

  @Get()
  @ApiResponse({ type: LvClass, isArray: true })
  @UseInterceptors(MapInterceptor(Curriculum, LvClass, { isArray: true }))
  async findAll(): Promise<Curriculum[]> {
    return this.lclassService.findAll();
  }

  @Get(':id')
  @UseInterceptors(MapInterceptor(Curriculum, LvClass))
  @ApiResponse({ type: LvClass, isArray: false })
  async findOne(@Param('id') id: string): Promise<Curriculum | null> {
    return this.lclassService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(MapInterceptor(LvClass, Curriculum))
  @ApiBody({ type: LvClass })
  async update(@Param('id') id: string, @Body() lclass: Curriculum): Promise<void> {
    try {
      return this.lclassService.update(+id, lclass);
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
      return this.lclassService.remove(+id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
