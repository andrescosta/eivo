import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Tenant } from './Tenant.entity';
import { Member } from './Member.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public name!: string;

  @ManyToMany(() => Tenant, (tenant) => tenant.users)
  public tenants!: Tenant[];

  @OneToMany(() => Member, (member) => member.user)
  public members?: Member[];

}
