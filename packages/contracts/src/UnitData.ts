import { ApiProperty } from '@nestjs/swagger';
import { LabeledData } from './Data';
import { LessonData } from './LessonData';
import { SyllabusData } from './SubjectData';

export class UnitData extends LabeledData {
  @ApiProperty({})
  smallImage?: string;

  @ApiProperty({})
  bigImage?: string;

  @ApiProperty({})
  subject!: SyllabusData;

  @ApiProperty({})
  lessonTemplates!: LessonData[];
}
