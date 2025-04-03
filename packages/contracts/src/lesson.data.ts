import { ExerciseData } from './exercise.data';
import { MaterialData } from './material.data';
import { LabeledData } from './data';
import { ApiProperty } from '@nestjs/swagger';

export class LessonData extends LabeledData {
  @ApiProperty({})
  exercises!: ExerciseData[];
  @ApiProperty({})
  material!: MaterialData[];
}
