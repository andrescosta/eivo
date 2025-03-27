import { ApiProperty } from '@nestjs/swagger';
import { CurriculumData } from './CurriculumData';
import { NamedData } from './Data';
import { MemberData } from './MemberData';

export class CourseData extends NamedData {
  @ApiProperty({})
  curriculum!: CurriculumData;
  @ApiProperty({})
  members!: MemberData[];
}