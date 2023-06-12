import { SportEntity } from 'src/sport/sport.entity';
import { TeamEntity } from 'src/team/team.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class CategorieEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => TeamEntity, (team) => team.categorie)
  teams: TeamEntity[];

  @ManyToOne(() => SportEntity, (sport) => sport.categories, {
    nullable: false,
  })
  sport: SportEntity;
}
