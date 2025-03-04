import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Tenant } from './Tenant';
import { TopicByDomain } from './TopicByDomain';

@Entity()
export class Domain {
  @PrimaryGeneratedColumn('increment')
  public id?: number;

  @Column()
  public name!: string;

  @Column({ nullable: true })
  public description?: string;

  @ManyToOne(() => Tenant)
  public tenant?: Tenant;

  @OneToMany(() => TopicByDomain, (topicByDomain) => topicByDomain.domain)
  public topics?: TopicByDomain[];

  @Column({ nullable: true })
  public type?: string;
}
