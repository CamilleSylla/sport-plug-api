import { CategorieEntity } from 'src/categorie/categorie.entity';
import { SportEntity } from 'src/sport/sport.entity';
import { TeamEntity } from 'src/team/team.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CompetitionEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => SportEntity, (sport) => sport.competitions, {
    nullable: false,
  })
  sport: SportEntity;

  @ManyToOne(() => CategorieEntity, (categorie) => categorie.competitions, {
    nullable: false,
  })
  categorie: CategorieEntity;

  @OneToMany(() => TeamEntity, (team) => team.competition)
  teams: TeamEntity[]
}
