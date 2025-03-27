import { MemberData } from './MemberData';
import { Data } from './Data';
import { ApiProperty } from '@nestjs/swagger';
import { ExerciseData } from './ExerciseData';

export class ActivityData extends Data{
  @ApiProperty({})
  exercise!: ExerciseData;
  @ApiProperty({})
  member?: MemberData;
  @ApiProperty({})
  status!: Status;
  @ApiProperty({})
  note?: number;
  @ApiProperty({})
  dateStatusUpdated!: Date;
}

export enum Status {
  COMPLETED,
  INPROGRESS,
  ASSIGNED,
}
