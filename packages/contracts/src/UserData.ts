import { LabeledData } from './Data';
import { MemberData } from './MemberData';
import { ApiProperty } from '@nestjs/swagger';

export class UserData extends LabeledData {
  @ApiProperty({})
  public members?: MemberData[];
}
