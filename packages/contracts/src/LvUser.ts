import { ApiProperty } from '@nestjs/swagger';

export class LvUser {
  @ApiProperty({
    example: '136ade9c5-790b-4df6-b975-68ca82cd269e',
    description: 'ID',
  })
  public id?: string;

  @ApiProperty({ example: 'Barry Egan', description: 'Name' })
  public name!: string;
}
