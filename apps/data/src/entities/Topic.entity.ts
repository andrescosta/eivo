import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Application } from './Application.entity';
import { Domain } from './Domain.entity';
import { Tenant } from './Tenant.entity';
import { TopicByDomain } from './TopicByDomain.entity';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn('increment')
  public id?: string;

  @Column()
  public description!: string;

  @ManyToOne(() => Tenant, (locataire) => locataire.topics)
  public tenant!: Tenant;

  @ManyToOne(() => Domain, (domaine) => domaine.topics)
  public domain!: Domain;

  @ManyToMany(() => Application)
  @JoinTable()
  public applications!: Application[];

  @OneToMany(
    () => TopicByDomain,
    (topicByDomain) => topicByDomain.topic,
  )
  public topicsByDomain!: TopicByDomain[];
}
