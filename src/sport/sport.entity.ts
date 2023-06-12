import { CategorieEntity } from 'src/categorie/categorie.entity';
import { ClubEntity } from 'src/club/club.entity';
import { CompetitionEntity } from 'src/competition/competition.entity';
import { TeamEntity } from 'src/team/team.entity';
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'

@Entity()
export class SportEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @OneToMany(() => ClubEntity, club => club.sport)
    clubs: ClubEntity[]
    
    @OneToMany(() => CategorieEntity, categorie => categorie.sport)
    categories: ClubEntity[]

    @OneToMany(() => TeamEntity, team => team.sport)
    teams: TeamEntity[]
    
    @OneToMany(() => CompetitionEntity, competition => competition.sport)
    competitions: CompetitionEntity[]

}