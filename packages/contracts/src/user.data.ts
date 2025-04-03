import { LabeledData } from './data';
import { MemberData } from './member.data';
import { ApiProperty } from '@nestjs/swagger';

export class UserData extends LabeledData {
  @ApiProperty({})
  public members?: MemberData[];
}
