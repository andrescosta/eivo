import { ApiProperty } from '@nestjs/swagger';
import { ActivityData } from './activity.data';
import { CourseData } from './course.data';
import { Data } from './data';
import { UserData } from './user.data';

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
