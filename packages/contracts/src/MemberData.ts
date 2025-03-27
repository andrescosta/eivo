import { ApiProperty } from '@nestjs/swagger';
import { ActivityData } from './ActivityData';
import { CourseData } from './CourseData';
import { Data } from './Data';
import { UserData } from './UserData';

export enum RoleData {
  ETUDIANT = 'ETUDIANT',
  PROFESSEUR = 'PROFESSEUR',
  ADMIN = 'ADMIN',
}

export class MemberData extends Data {
  @ApiProperty({})
  user!: UserData;

  @ApiProperty({})
  course!: CourseData;

  @ApiProperty({})
  activities!: ActivityData[];

  @ApiProperty({})
  role!: RoleData;
}
