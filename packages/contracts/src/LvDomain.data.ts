import { ApiProperty } from '@nestjs/swagger';
import { LvTenant } from './LvTenant.data';
import { LvTopic } from './LvTopic.data';

export class LvDomain {
  @ApiProperty({
    example: '136ade9c5-790b-4df6-b975-68ca82cd269e',
    description: 'ID',
  })
  public id?: string;

  @ApiProperty({example:'English', description:'Name'})
  public name!: string;

  @ApiProperty({example:'English ...', description:'Description'})
  public description?: string;

  @ApiProperty({description:'Tenant'})
  public tenant?: LvTenant;

  @ApiProperty({description:'Topics'})
  public topics?: LvTopic[];

  @ApiProperty({example:'TBD', description:'Type'})
  public type?: string;
}
