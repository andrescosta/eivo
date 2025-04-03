import { ApiProperty } from '@nestjs/swagger';
import { LabeledData } from './data';
import { LessonData } from './lesson.data';
import { SyllabusData } from './subject.data';

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
