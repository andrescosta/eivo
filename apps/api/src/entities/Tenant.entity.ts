import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Topic } from './Topic.entity';

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn('increment')
  public id?: string;

  @Column()
  public name!: string;

  @Column({ nullable: true })
  public description?: string;

  @OneToMany(() => Topic, (topic) => topic.tenant)
  public topics!: Topic[];
}
