import { ApiProperty } from '@nestjs/swagger';
import { LvClass } from './LvClass';
import { LvUser } from './LvUser';

export class LvMember {
  @ApiProperty({
    example: '136ade9c5-790b-4df6-b975-68ca82cd269e',
    description: 'ID',
  })
  id!: string;

  @ApiProperty({description:'User'})
  user!: LvUser;

  @ApiProperty({description:'Class'})
  myclass!: LvClass;

  @ApiProperty({example:'STUDENT',description:'Role'})
  role!: LvRole;
}

export enum LvRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN',
}
