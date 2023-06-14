import { CategorieEntity } from 'src/categorie/categorie.entity';
import { ClubEntity } from 'src/club/club.entity';
import { CompetitionEntity } from 'src/competition/competition.entity';
import { SportEntity } from 'src/sport/sport.entity';
import { UserEntity } from 'src/users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class TeamEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => ClubEntity, (club) => club.teams)
  club: ClubEntity;

  @ManyToOne(() => SportEntity, (sport) => sport.teams)
  sport: SportEntity;

  @ManyToOne(() => CategorieEntity, (categorie) => categorie.teams)
  categorie: CategorieEntity;

  @ManyToOne(() => CompetitionEntity, (competition) => competition.teams)
  competition: CompetitionEntity;

  @OneToMany(() => UserEntity, (user) => user.team)
  users: UserEntity[];
}
