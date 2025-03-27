import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, NotFoundException } from '@nestjs/common';
import { ActivityService } from './ActivityService';
import { ActivityData } from '@eivo/contracts';
import { Activity } from '../entities/Activity.entity';
import { MapInterceptor } from '@automapper/nestjs';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { EntityNotFoundError } from '../entities/EntityNotFoundError';

@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  @UseInterceptors(MapInterceptor(Activity, ActivityData))
  @UseInterceptors(MapInterceptor(ActivityData, Activity))
  @ApiResponse({ type: ActivityData })
  @ApiBody({ type: ActivityData })
  async create(@Body() domain: Activity): Promise<Activity> {
    return await this.activityService.create(domain);
  }

  @Get()
  @ApiResponse({ type: ActivityData, isArray: true })
  @UseInterceptors(
    MapInterceptor(Activity, ActivityData, { isArray: true }),
  )
  async findAll(): Promise<Activity[]> {
    return this.activityService.findAll();
  }

  @Get(':id')
  @UseInterceptors(MapInterceptor(Activity, ActivityData))
  @ApiResponse({ type: ActivityData, isArray: false })
  async findOne(@Param('id') id: string): Promise<Activity | null> {
    return this.activityService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(MapInterceptor(ActivityData, Activity))
  @ApiBody({ type: ActivityData })
  async update(
    @Param('id') id: string,
    @Body() utilisateur: Activity,
  ): Promise<Activity> {
    try {
      return this.activityService.update(+id, utilisateur);
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
      this.activityService.remove(+id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
