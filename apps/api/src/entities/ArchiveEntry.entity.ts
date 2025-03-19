import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Member } from './Member.entity';

@Entity()
export class ArchiveEntry {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: Date;

  @ManyToOne(() => Member, (member) => member.historicinfo)
  member!: Member;
}
