import { NamedData } from './Data';
import { MemberData } from './MemberData';
import { ApiProperty } from '@nestjs/swagger';

export class UserData extends NamedData {
  @ApiProperty({})
  public members?: MemberData[];
}
