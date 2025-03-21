import { PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Subject } from './Subject.entity';
import { LessonTemplate } from './LessonTemplate.entity';
import { Schema } from './Schema.entity';

export class Unit {
  @PrimaryGeneratedColumn('increment')
  public id?: string;

  @Column()
  public name!: string;

  @Column({ nullable: true })
  public description?: string;

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

  @ManyToOne(() => Subject)
  subject!: Subject;

  @OneToMany(() => LessonTemplate, (lessonTemplate) => lessonTemplate.unit)
  lessonTemplates!: LessonTemplate[];

  @OneToMany(()=>Schema, (schema)=>schema.unit)
  schemas!:Schema[];
}
