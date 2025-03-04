import { ApiProperty } from "@nestjs/swagger";

export class LvTenant {
  @ApiProperty({
    example: '136ade9c5-790b-4df6-b975-68ca82cd269e',
    description: 'ID',
  })
  public id?: string;

  @ApiProperty({example:'Big app', description:'Name'})
  public name!: string;


  @ApiProperty({example:'Big app ...', description:'Description'})
  public description?: string;
}
