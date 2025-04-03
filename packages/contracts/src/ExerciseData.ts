import { ApiProperty } from '@nestjs/swagger';
import { LabeledData } from './Data';
import { LessonData } from './LessonData';
import { LearnData } from './LearnData';

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
