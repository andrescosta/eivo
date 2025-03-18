import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { TopicByDomain } from './TopicByDomain.entity';
import { Domain } from './Domain.entity';
import { Member } from './Member.entity';

@Entity()
export class LClass {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => Domain)
  domain!: Domain;

  @OneToMany(() => TopicByDomain, (topicsByDomaine) => topicsByDomaine.topic)
  topics?: TopicByDomain[];

  @OneToMany(() => Member, (member) => member.myclass)
  members!: Member[];
}
