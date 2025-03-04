import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Domain } from './Domain';
import { Topic } from './Topic';

@Entity()
export class TopicByDomain {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Domain, (domaine) => domaine.topics)
  domain?: Domain;

  @ManyToOne(() => Topic, (topique) => topique.topicsByDomain)
  topic?: Topic;
}
