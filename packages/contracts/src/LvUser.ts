import { ApiProperty } from '@nestjs/swagger';

export class LvUser {
    @ApiProperty({ example: "1", description: 'The age of the Cat' })
    public id?: string;
    
    @ApiProperty({ example: "1", description: 'The age of the Cat' })
    public name!: string;
}
