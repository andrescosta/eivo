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
import { ApplicationService } from './ApplicationService';
import {
  LvApplication,
  LvExercise,
  LvLesson,
  LvVarions,
} from '@lingv/contracts';
import { LearningTemplate } from '../entities/Application.entity';
import { MapInterceptor } from '@automapper/nestjs';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { EntityNotFoundError } from '../entities/EntityNotFoundError.entity';
import { Lesson } from '../entities/Lesson.entity';
import { generate } from '../llm/Llm';
import { render } from 'mustache';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @UseInterceptors(MapInterceptor(LearningTemplate, LvApplication))
  @UseInterceptors(MapInterceptor(LvApplication, LearningTemplate))
  @ApiResponse({ type: LvApplication })
  @ApiBody({ type: LvApplication })
  async create(@Body() domain: LearningTemplate): Promise<LearningTemplate> {
    return await this.applicationService.create(domain);
  }

  @Get()
  // @ApiResponse({ type: LvApplication, isArray: true })
  @UseInterceptors(
    MapInterceptor(LearningTemplate, LvApplication, { isArray: true }),
  )
  async findAll(): Promise<LearningTemplate[]> {
    const apps = await this.applicationService.findAll();
    return apps;
  }

  @Get(':id')
  @ApiResponse({ type: LvApplication, isArray: false })
  @UseInterceptors(MapInterceptor(LearningTemplate, LvApplication))
  async findOne(@Param('id') id: string): Promise<LearningTemplate | null> {
    return this.applicationService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(MapInterceptor(LvApplication, LearningTemplate))
  @ApiBody({ type: LvApplication })
  async update(
    @Param('id') id: string,
    @Body() utilisateur: LearningTemplate,
  ): Promise<LearningTemplate> {
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

  @Get(':app_id/lessons/:les_id')
  @ApiResponse({ type: Lesson, isArray: true })
  async findExercises(
    @Param('app_id') appId: number,
    @Param('les_id') lesId: number,
  ): Promise<LvLesson[] | undefined> {
    const app = await this.applicationService.findWithExercises(appId, lesId);
    const lvls = app?.lessons.map((l) => {
      const lvl = new LvLesson();
      lvl.description = l.description;
      lvl.exercises = l.exercises.flatMap((e) => {
        return e.variations.flatMap((vv) => {
          return Object.keys(vv).flatMap((vk) => {
            return vv[vk].anyOf.flatMap((vari) => {
              const lve = new LvExercise();
              lve.id = e.id;
              lve.variations = { [`${vk}`]: vari };
              lve.kind = e.kind;
              lve.shortDescription = render(e.descriptions.short, {
                variations: { [`${vk}`]: vari },
              });
              lve.longDescription = render(e.descriptions.long, {
                variations: { [`${vk}`]: vari },
              });
              return lve;
            });
          });
        });
      });
      return lvl;
    });
    return lvls;
  }
  @Post(':app_id/lessons/:les_id/exercises/:ex_id')
  @ApiResponse({ type: Lesson, isArray: false })
  async findExercise(
    @Body() vv: LvVarions,
    @Param('app_id') appId: number,
    @Param('les_id') lesId: number,
    @Param('ex_id') exId: number,
  ): Promise<Lesson | null> {
    const a = await this.applicationService.findExercise(appId, lesId, exId);
    const e = a?.lessons[0]?.exercises[0];
    if (e != null) {
      return await generate(e, vv);
    }
    return null;
  }
}
