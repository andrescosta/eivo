import { MemberData } from './member.data';
import { Data } from './data';
import { ApiProperty } from '@nestjs/swagger';
import { ExerciseData } from './exercise.data';

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
