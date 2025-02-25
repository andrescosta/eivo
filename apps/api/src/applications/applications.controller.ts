import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { LvApplication } from '@lingv/contracts';
import { Application } from '../entities/application.entity';
import { MapInterceptor } from '@automapper/nestjs';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  @UseInterceptors(MapInterceptor(LvApplication, Application))
  async create(@Body() application: Application): Promise<Application> {
    return this.applicationsService.create(application);
  }

  @Get()
  @UseInterceptors(MapInterceptor(Application, LvApplication))
  async findAll(): Promise<Application[]> {
    return this.applicationsService.findAll();
  }

  @Get(':id')
  @UseInterceptors(MapInterceptor(Application, LvApplication))
  async findOne(@Param('id') id: string): Promise<Application | null> {
    return this.applicationsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() application: LvApplication): Promise<void> {
    return this.applicationsService.update(id, new Application());
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.applicationsService.remove(id);
  }
}
