import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Tenant } from './Tenant.entity';
import { Subject } from './Subject.entity';

@Entity()
export class Curriculum {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => Tenant)
  tenant!: Tenant;

  @OneToMany(()=>Subject, (subject) => subject.curriculum)
  subjects!:Subject[];
}
