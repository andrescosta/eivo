import { ApiProperty } from '@nestjs/swagger';
import { Data } from './Data';
import { SubjectData } from './SubjectData';

export class CurriculumData extends Data {
  @ApiProperty({
    description: 'Subjects.',
  })
  subjects!: SubjectData[];
}
