import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tenant } from './Tenant.entity';
import { Curriculum } from './Curriculum.entity';
import { Member } from './Member.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('increment')
  id!: number;
  @Column()
  name!: string;
  @Column()
  description!: string;
  @ManyToOne(() => Tenant)
  tenant!: Tenant;
  @ManyToOne(() => Curriculum)
  curriculum!: Curriculum;
  @ManyToMany(() => Member, (member) => member.course)
  members!: Member[];
}
