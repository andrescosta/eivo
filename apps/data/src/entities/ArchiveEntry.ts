import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Member } from './Member';

@Entity()
export class ArchiveEntry {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: Date;

  @ManyToOne(() => Member, (member) => member.historicinfo)
  member!: Member;
}
