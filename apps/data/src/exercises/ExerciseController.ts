import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  NotFoundException,
} from '@nestjs/common';
import { ApplicationService } from './ExerciseService';
import { LvApplication } from '@lingv/contracts';
import { Application } from '../entities/Application';
import { MapInterceptor } from '@automapper/nestjs';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { EntityNotFoundError } from '../entities/EntityNotFoundError';

@Controller('exercises')
export class ExerciseController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @UseInterceptors(MapInterceptor(Application, LvApplication))
  @UseInterceptors(MapInterceptor(LvApplication, Application))
  @ApiResponse({ type: LvApplication })
  @ApiBody({ type: LvApplication })
  async create(@Body() domain: Application): Promise<Application> {
    return await this.applicationService.create(domain);
  }

  @Get()
  @ApiResponse({ type: LvApplication, isArray: true })
  @UseInterceptors(
    MapInterceptor(Application, LvApplication, { isArray: true }),
  )
  async findAll(): Promise<Application[]> {
    return this.applicationService.findAll();
  }

  @Get(':id')
  @UseInterceptors(MapInterceptor(Application, LvApplication))
  @ApiResponse({ type: LvApplication, isArray: false })
  async findOne(@Param('id') id: string): Promise<Application | null> {
    return this.applicationService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(MapInterceptor(LvApplication, Application))
  @ApiBody({ type: LvApplication })
  async update(
    @Param('id') id: string,
    @Body() utilisateur: Application,
  ): Promise<Application> {
    try {
      return this.applicationService.update(+id, utilisateur);
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
      this.applicationService.remove(+id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
