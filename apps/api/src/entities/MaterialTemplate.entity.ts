import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { LessonTemplate } from './LessonTemplate.entity';
import { AnyOf, Description, Learn, Prompt } from './Template';


@Entity()
export class MaterialTemplate {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  kind!: string;

  @Column()
  theme!: string;

  @Column()
  type!: string;

  @Column(() => Prompt)
  prompt!: Prompt;

  @Column()
  schema!: string;

  @Column(() => Description)
  descriptions!: Description;

  @Column(() => Learn)
  learn!: Learn;

  /**
   * @autoMapIgnore
   */
  @Column('json')
  variations!: Array<Record<string, AnyOf>>;

  @Column(() => Cache)
  cache!: Cache;

  @ManyToOne(() => LessonTemplate, (lesson) => lesson.material)
  lesson!: LessonTemplate;
}
