import { ExerciseData } from './ExerciseData';
import { MaterialData } from './MaterialData';
import { NamedData } from './Data';
import { ApiProperty } from '@nestjs/swagger';

export class LessonData extends NamedData {
  @ApiProperty({})
  exercises!: ExerciseData[];
  @ApiProperty({})
  material!: MaterialData[];
}
