import { ApiProperty } from '@nestjs/swagger';
import { LvMember } from './LvMember';

export class LvArchiveEntry {
  @ApiProperty({
    example: '136ade9c5-790b-4df6-b975-68ca82cd269e',
    description: 'ID',
  })
  id!: number;

  @ApiProperty({ example: '01/01/2001', description: 'Activiti date' })
  date!: Date;

  @ApiProperty({ description: 'Member' })
  member!: LvMember;
}
