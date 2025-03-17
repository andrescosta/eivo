import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Application } from './Application';
import { Domain } from './Domain';
import { Tenant } from './Tenant';
import { TopicByDomain } from './TopicByDomain';

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
