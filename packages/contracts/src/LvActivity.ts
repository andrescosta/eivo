import { ApiProperty } from '@nestjs/swagger';
import { LvApplication } from './LvApplication';
import { LvClass } from './LvClass';

export class LvActivity {
  @ApiProperty({
    example: '136ade9c5-790b-4df6-b975-68ca82cd269e',
    description: 'ID',
  })
  id!: string;

  @ApiProperty({ description: 'Application' })
  application!: LvApplication;

  @ApiProperty({ description: 'Application' })
  class!: LvClass;
}
