import { Controller, Get, Param } from '@nestjs/common';
import { ApplicationService } from '../applications/ApplicationService';
import { ApiResponse } from '@nestjs/swagger';
import { Lesson } from '../entities/Lesson';
import { generate } from '../llm/ExercisesGenService';
import { LvExercise, LvLesson } from './LvLesson';
import { parse, render } from 'mustache';

@Controller('lessons')
export class LessonController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get(':appId')
  @ApiResponse({ type: Lesson, isArray: true })
  async findOne(
    @Param('appId') appId: number,
  ): Promise<LvLesson[] | undefined> {
    const app = await this.applicationService.findWithExercises(appId);
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
}
