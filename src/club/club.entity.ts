import { SportEntity } from 'src/sport/sport.entity';
import { TeamEntity } from 'src/team/team.entity';
import { UserEntity } from 'src/users/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  ManyToMany,
  CreateDateColumn,
  JoinTable,
  JoinColumn,
} from 'typeorm';

@Entity()
export class ClubEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  adress: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  zip: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: false })
  createdBy: string;

  @Column({ nullable: true })
  logo?: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => UserEntity, (user) => user.superadmin, {
    onDelete: 'SET NULL'
  })
  kams: UserEntity[];
  
  @OneToMany(() => UserEntity, (user) => user.club, {
    onDelete: 'SET NULL',
  })
  users: UserEntity[];

  @ManyToOne(() => SportEntity, (sport) => sport.clubs, { cascade: true })
  sport: SportEntity;

  @OneToMany(() => TeamEntity, (team) => team.club, { cascade: true })
  teams: TeamEntity[];
}
