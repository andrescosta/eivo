import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, NotFoundException } from '@nestjs/common';
import { ActivityService } from './ActivityService';
import { LvActivity } from '@lingv/contracts';
import { Activity } from '../entities/Activity';
import { MapInterceptor } from '@automapper/nestjs';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { EntityNotFoundError } from '../entities/EntityNotFoundError';

@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  @UseInterceptors(MapInterceptor(Activity, LvActivity))
  @UseInterceptors(MapInterceptor(LvActivity, Activity))
  @ApiResponse({ type: LvActivity })
  @ApiBody({ type: LvActivity })
  async create(@Body() domain: Activity): Promise<Activity> {
    return await this.activityService.create(domain);
  }

  @Get()
  @ApiResponse({ type: LvActivity, isArray: true })
  @UseInterceptors(
    MapInterceptor(Activity, LvActivity, { isArray: true }),
  )
  async findAll(): Promise<Activity[]> {
    return this.activityService.findAll();
  }

  @Get(':id')
  @UseInterceptors(MapInterceptor(Activity, LvActivity))
  @ApiResponse({ type: LvActivity, isArray: false })
  async findOne(@Param('id') id: string): Promise<Activity | null> {
    return this.activityService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(MapInterceptor(LvActivity, Activity))
  @ApiBody({ type: LvActivity })
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
