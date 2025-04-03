import { ApiProperty } from '@nestjs/swagger';
import { LabeledData } from './data';
import { LessonData } from './lesson.data';
import { LearnData } from './learn.data';

export class ExerciseData extends LabeledData {
  @ApiProperty({})
  kind!: string;
  @ApiProperty({})
  theme!: string;
  @ApiProperty({})
  type!: string;
  @ApiProperty({})
  learn!: LearnData;
  @ApiProperty({})
  lesson!: LessonData;
}
