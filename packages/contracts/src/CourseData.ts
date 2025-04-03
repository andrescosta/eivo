import { ApiProperty } from '@nestjs/swagger';
import { CurriculumData } from './CurriculumData';
import { LabeledData } from './Data';
import { MemberData } from './MemberData';

export class CourseData extends LabeledData {
  @ApiProperty({})
  curriculum!: CurriculumData;
  @ApiProperty({})
  members!: MemberData[];
}