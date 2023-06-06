import { SportEntity } from 'src/sport/sport.entity';
import { TeamEntity } from 'src/team/team.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class ClubEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => SportEntity, (sport) => sport.clubs)
  sport: SportEntity;

  @OneToMany(() => TeamEntity, team => team.club)
  teams: ClubEntity[]
}
