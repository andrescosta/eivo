import { ApiProperty } from '@nestjs/swagger';
import { CurriculumData } from './curriculum.data';
import { LabeledData } from './data';
import { MemberData } from './member.data';

export class CourseData extends LabeledData {
  @ApiProperty({})
  curriculum!: CurriculumData;
  @ApiProperty({})
  members!: MemberData[];
}