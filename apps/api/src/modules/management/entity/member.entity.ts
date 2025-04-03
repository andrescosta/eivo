import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Activity } from './activity.entity';
import { Course } from './course.entity';
import { EivoEntity } from '../../common/entity/eivo-entity.entity';
import { User } from '../../auth/entity/user.entity';

export enum Role {
  ETUDIANT = 'ETUDIANT',
  PROFESSEUR = 'PROFESSEUR',
  ADMIN = 'ADMIN',
}

@Entity()
export class Member extends EivoEntity {
  @ManyToOne(() => User, (user) => user.members)
  user!: User;

  @ManyToOne(() => Course, (course) => course.members)
  course!: Course;

  @OneToMany(() => Activity, (activity) => activity.member, { cascade: true })
  activities!: Activity[];

  @Column({
    type: 'enum',
    enum: Role,
  })
  role!: Role;
}
