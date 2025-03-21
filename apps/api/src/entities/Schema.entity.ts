import {
  AfterLoad,
  AfterRecover,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Unit } from './Unit.entity';

@Entity()
export class Schema {
  @PrimaryGeneratedColumn('increment')
  public id?: string;

  @Column('json')
  definitions!: Map<string, Record<string, string | number | object>>;

  @ManyToOne(() => Unit)
  unit!: Unit;

  @AfterRecover()
  @AfterLoad()
  afterProcess() {
    if (this.definitions != null) {
      this.definitions = new Map(Object.entries(this.definitions));
    }
  }
}
