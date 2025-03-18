import { ApiProperty } from '@nestjs/swagger';
import { LvTenant } from './LvTenant.data';

export class LvTopic {
  @ApiProperty({
    example: '136ade9c5-790b-4df6-b975-68ca82cd269e',
    description: 'ID',
  })
  public id?: string;

  @ApiProperty({example:'Topic ...', description:'Description'})
  public description!: string;

  @ApiProperty({description:'Tenant'})
  public tenant!: LvTenant;
}
