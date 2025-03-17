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
import { TopicService } from './TopicService';
import { Topic } from '../entities/Topic';
import { LvTopic } from '@lingv/contracts';
import { MapInterceptor } from '@automapper/nestjs';
import { EntityNotFoundError } from '../entities/EntityNotFoundError';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('topiques')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post()
  @UseInterceptors(MapInterceptor(Topic, LvTopic))
  @UseInterceptors(MapInterceptor(LvTopic, Topic))
  @ApiResponse({ type: LvTopic })
  @ApiBody({ type: LvTopic })
  async create(@Body() topique: Topic): Promise<Topic> {
    return this.topicService.create(topique);
  }

  @Get()
  @ApiResponse({ type: LvTopic, isArray: true })
  @UseInterceptors(MapInterceptor(Topic, LvTopic, { isArray: true }))
  async findAll(): Promise<Topic[]> {
    return this.topicService.findAll();
  }

  @Get(':id')
  @UseInterceptors(MapInterceptor(Topic, LvTopic))
  @ApiResponse({ type: LvTopic, isArray: false })
  async findOne(@Param('id') id: string): Promise<Topic | null> {
    return this.topicService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(MapInterceptor(LvTopic, Topic))
  @ApiBody({ type: LvTopic })
  async update(@Param('id') id: string, @Body() topic: Topic): Promise<void> {
    try {
      return this.topicService.update(id, topic);
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
      return this.topicService.remove(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
