import { ApiProperty } from '@nestjs/swagger';
import { CurriculumData } from './curriculum.data';
import { LabeledData } from './data';
import { UnitData } from './unit.data';

export class SyllabusData extends LabeledData {

  @ApiProperty({})
  curriculum!: CurriculumData;
  
  @ApiProperty({})
  units!: UnitData[];
}