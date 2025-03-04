import { ApiProperty } from '@nestjs/swagger';
import { LvActivity } from './LvActivity';
import { LvMember } from './LvMember';

export class LvGame {
  @ApiProperty({
    example: '136ade9c5-790b-4df6-b975-68ca82cd269e',
    description: 'ID',
  })
  id!: string;
  
  @ApiProperty({example:'Crossing animal', description:'Name'})
  name!: string;

  @ApiProperty({example:'Crossing animal ...', description:'Description'})
  description?: string;

  @ApiProperty({description:'Member'})
  members!: LvMember[];

  @ApiProperty({example:'01/01/2001', description:'Game Date'})
  date!: Date;

  @ApiProperty({description:'Activity'})
  activity!: LvActivity;
}
