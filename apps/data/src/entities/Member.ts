import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { LClass } from './LClass';
import { User } from './User';
import { ArchiveEntry } from './ArchiveEntry';

export enum Role {
  ETUDIANT = 'ETUDIANT',
  PROFESSEUR = 'PROFESSEUR',
  ADMIN = 'ADMIN',
}

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.members)
  user!: User;

  @ManyToOne(() => LClass, (lvclass) => lvclass.members)
  myclass!: LClass;

  @OneToMany(() => ArchiveEntry, (historicalinfo) => historicalinfo.member)
  historicinfo!: ArchiveEntry[];

  @Column({
    type: 'enum',
    enum: Role,
  })
  role!: Role;
}
