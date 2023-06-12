import { CategorieEntity } from 'src/categorie/categorie.entity';
import { ClubEntity } from 'src/club/club.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class TeamEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => ClubEntity, (club) => club.teams)
  club: ClubEntity;

  @ManyToOne(() => CategorieEntity, (categorie) => categorie.teams)
  categorie: CategorieEntity;
}
