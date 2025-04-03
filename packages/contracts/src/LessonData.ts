import { ExerciseData } from './ExerciseData';
import { MaterialData } from './MaterialData';
import { LabeledData } from './Data';
import { ApiProperty } from '@nestjs/swagger';

export class LessonData extends LabeledData {
  @ApiProperty({})
  exercises!: ExerciseData[];
  @ApiProperty({})
  material!: MaterialData[];
}
