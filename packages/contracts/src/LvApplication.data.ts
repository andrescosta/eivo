import { ApiProperty } from '@nestjs/swagger';
import { LvTopic } from './LvTopic.data';

export class LvApplication {
  @ApiProperty({
    example: '136ade9c5-790b-4df6-b975-68ca82cd269e',
    description: 'ID',
  })
  id!: string;

  @ApiProperty({example:'Cross Word', description:'Name'})
  name!: string;

  @ApiProperty({example:'Cross Word ....', description:'Description'})
  description!: string;

  @ApiProperty({example:'https://cdn/img_s.jpg', description:'Small image'})
  smallImage!: string;

  @ApiProperty({example:'https://cdn/img_b.jpg', description:'Large Image'})
  bigImage!: string;

  @ApiProperty({description:'Topic'})
  topics!: LvTopic[];

  @ApiProperty({example:'IA', description:'Type'})
  type!: LvApplicationType;
}

export enum LvApplicationType {
  Human = 'Human',
  IA = 'IA',
}
