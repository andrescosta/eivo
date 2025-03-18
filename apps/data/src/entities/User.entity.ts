import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Member } from './Member.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public name!: string;

  @OneToMany(() => Member, (membre) => membre.user)
  public members!: Member[];
}
