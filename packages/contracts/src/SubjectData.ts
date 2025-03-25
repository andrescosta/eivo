import { ApiProperty } from '@nestjs/swagger';
import { CurriculumData } from './CurriculumData';
import { NamedData } from './Data';
import { UnitData } from './UnitData';

export class SubjectData extends NamedData {

  @ApiProperty({})
  curriculum!: CurriculumData;
  
  @ApiProperty({})
  units!: UnitData[];
}