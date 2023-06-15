import { ClubEntity } from 'src/club/club.entity';
import { TeamEntity } from 'src/team/team.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  firstname: string;

  @Column({ nullable: false })
  lastname: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  refreshToken?: string;

  @ManyToOne(() => ClubEntity, (club) => club.users)
  club: ClubEntity;

  @ManyToOne(() => TeamEntity, (team) => team.users)
  team: TeamEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
