import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Curriculum } from './Curriculum.entity';
import { User } from './User.entity';
import { Course } from './Course.entity';

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn('increment')
  public id?: string;

  @Column()
  public name!: string;

  @Column({ nullable: true })
  public description?: string;

  @OneToMany(() => Curriculum, (program) => program.tenant)
  public curriculums!: Curriculum[];

  @ManyToMany(() => User, (user) => user.tenants)
  public users!: User[];

  @OneToMany(() => Course, (course) => course.tenant)
  public courses!: Course[];

}
