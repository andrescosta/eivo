import { Controller, Post, Param, Body } from '@nestjs/common';
import { ApplicationService } from '../applications/ApplicationService';
import { ApiResponse } from '@nestjs/swagger';
import { Lesson } from '../entities/Lesson';
import { generate } from '../llm/ExercisesGenService';

export class VV {
  variations!: Record<string, string>;
}

@Controller('gen')
export class ExerciseController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post('applications/:app_id/lessons/:les_id/exercises/:ex_id')
  @ApiResponse({ type: Lesson, isArray: false })
  async findOne(
    @Body() vv:VV,
    @Param('app_id') appId: number,
    @Param('les_id') lesId: number,
    @Param('ex_id') exId: number,
    
  ): Promise<Lesson | null> {
    console.log(appId, lesId, exId);
    const a = await this.applicationService.findExercise(appId, lesId, exId);
    const e = a?.lessons[0]?.exercises[0];
    if (e != null) {
      return await generate(e, vv);
    }
    return null;
  }
}

