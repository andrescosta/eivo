import { ApiProperty } from '@nestjs/swagger';
import { Data } from './Data';
import { SyllabusData } from './SubjectData';

export class CurriculumData extends Data {
  @ApiProperty({
    description: 'Subjects.',
  })
  subjects!: SyllabusData[];
}
