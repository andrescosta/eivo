import { ApiProperty } from '@nestjs/swagger';
import { NamedData } from './Data';
import { LessonData } from './LessonData';
import { SubjectData } from './SubjectData';

export class UnitData extends NamedData {
  @ApiProperty({})
  smallImage?: string;

  @ApiProperty({})
  bigImage?: string;

  @ApiProperty({})
  subject!: SubjectData;

  @ApiProperty({})
  lessonTemplates!: LessonData[];
}
