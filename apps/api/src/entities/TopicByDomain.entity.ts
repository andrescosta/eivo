import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Domain } from './Domain.entity';
import { Topic } from './Topic.entity';

@Entity()
export class TopicByDomain {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Domain, (domaine) => domaine.topics)
  domain?: Domain;

  @ManyToOne(() => Topic, (topique) => topique.topicsByDomain)
  topic?: Topic;
}
