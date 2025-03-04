import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, NotFoundException } from '@nestjs/common';
import { LClassService } from './LClassService';
import { LClass } from '../entities/LClass';
import { LvClass } from '@lingv/contracts';
import { MapInterceptor } from '@automapper/nestjs';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { EntityNotFoundError } from '../entities/EntityNotFoundError';

@Controller('classes')
export class LClassController {
  constructor(private readonly lclassService: LClassService) {}

  @Post()
  @UseInterceptors(MapInterceptor(LClass, LvClass))
  @UseInterceptors(MapInterceptor(LvClass, LClass))
  @ApiResponse({ type: LvClass })
  @ApiBody({ type: LvClass })
  async create(@Body() lclass: LClass): Promise<LClass> {
    return this.lclassService.create(lclass);
  }

  @Get()
  @ApiResponse({ type: LvClass, isArray: true })
  @UseInterceptors(MapInterceptor(LClass, LvClass, { isArray: true }))
  async findAll(): Promise<LClass[]> {
    return this.lclassService.findAll();
  }

  @Get(':id')
  @UseInterceptors(MapInterceptor(LClass, LvClass))
  @ApiResponse({ type: LvClass, isArray: false })
  async findOne(@Param('id') id: string): Promise<LClass | null> {
    return this.lclassService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(MapInterceptor(LvClass, LClass))
  @ApiBody({ type: LvClass })
  async update(@Param('id') id: string, @Body() lclass: LClass): Promise<void> {
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
