import { ApiProperty } from '@nestjs/swagger';
import { Data } from './data';
import { SyllabusData } from './subject.data';

export class CurriculumData extends Data {
  @ApiProperty({
    description: 'Subjects.',
  })
  subjects!: SyllabusData[];
}
