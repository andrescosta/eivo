import { ApiProperty } from '@nestjs/swagger';
import { NamedData } from './Data';
import { LessonData } from './LessonData';
import { LearnData } from './LearnData';

export class ExerciseData extends NamedData {
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
