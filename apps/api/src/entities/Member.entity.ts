import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { User } from './User.entity';
import { Course } from './Course.entity';
import { Activity } from './Activity.entity';

export enum Role {
  ETUDIANT = 'ETUDIANT',
  PROFESSEUR = 'PROFESSEUR',
  ADMIN = 'ADMIN',
}

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.members)
  user!: User;

  @ManyToOne(() => Course, (course) => course.members)
  course!: Course;

  @OneToMany(() => Activity, (activity) => activity.member)
  activities!: Activity[];

  @Column({
    type: 'enum',
    enum: Role,
  })
  role!: Role;
}
