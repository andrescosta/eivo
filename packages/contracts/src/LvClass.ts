import { ApiProperty } from '@nestjs/swagger';
import { LvDomain } from './LvDomain';
import { LvTopic } from './LvTopic';

export class LvClass {
  @ApiProperty({
    example: '136ade9c5-790b-4df6-b975-68ca82cd269e',
    description: 'ID',
  })
  id!: string;

  @ApiProperty({ example: 'French school', description: 'Name' })
  name!: string;

  @ApiProperty({ example: 'French school ...', description: 'Name' })
  description?: string;

  @ApiProperty({ description: 'Domain' })
  domain?: LvDomain;

  @ApiProperty({ description: 'Topics' })
  topics?: LvTopic[];
}
