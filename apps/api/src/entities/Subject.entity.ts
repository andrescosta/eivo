import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Curriculum } from './Curriculum.entity';
import { Unit } from './Unit.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn('increment')
  public id?: string;

  @Column()
  public name!: string;

  @Column({ nullable: true })
  public description?: string;

  @ManyToOne(() => Curriculum)
  curriculum!: Curriculum;

  @OneToMany(() => Unit, (unit) => unit.subject)
  units!: Unit[];
}
