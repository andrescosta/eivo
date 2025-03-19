import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  AfterRecover,
  AfterLoad,
} from 'typeorm';
import { Topic } from './Topic.entity';
import { LessonTemplate } from './LessonTemplate.entity';

export enum ApplicationType {
  Humain = 'Humain',
  IA = 'IA',
}

@Entity()
export class Application {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  name!: string;

  /**
   * @autoMapIgnore
   */
  @Column()
  description!: string;

  /**
   * @autoMapIgnore
   */
  @Column({ nullable: true })
  smallImage?: string;

  /**
   * @autoMapIgnore
   */
  @Column({ nullable: true })
  bigImage?: string;

  /**
   * @autoMapIgnore
   */
  @ManyToMany(() => Topic, (topics) => topics.applications)
  topics?: Topic[];

  /**
   * @autoMapIgnore
   */
  @OneToMany(() => LessonTemplate, (lesson) => lesson.application, {
    cascade: true,
  })
  lessons!: LessonTemplate[];

  @Column('json')
  schemas!: Map<string, Record<string, string | number | object>>;

  @AfterRecover()
  @AfterLoad()
  afterProcess() {
    if (this.schemas != null) {
      this.schemas = new Map(Object.entries(this.schemas));
    }
  }
  /**
   * @autoMapIgnore
   */
  @Column({
    type: 'enum',
    enum: ApplicationType,
  })
  type!: ApplicationType;
}
