import { ApiProperty } from '@nestjs/swagger';
import { CurriculumData } from './CurriculumData';
import { LabeledData } from './Data';
import { UnitData } from './UnitData';

export class SyllabusData extends LabeledData {

  @ApiProperty({})
  curriculum!: CurriculumData;
  
  @ApiProperty({})
  units!: UnitData[];
}