import {
  AfterLoad,
  AfterRecover,
  Column,
  Entity,
  ManyToOne
} from 'typeorm';
import { EivoEntity } from './EntityBase.entity';
import { Tenant } from './Tenant.entity';

@Entity()
export class LLMSchema extends EivoEntity{

  @Column('json')
  definitions!: Map<string, Record<string, string | number | object>>;

  @ManyToOne(() => Tenant)
  tenant!: Tenant;

  @AfterRecover()
  @AfterLoad()
  afterProcess() {
    if (this.definitions != null) {
      this.definitions = new Map(Object.entries(this.definitions));
    }
  }
}
