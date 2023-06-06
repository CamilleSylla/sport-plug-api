import { ClubEntity } from 'src/club/club.entity';
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'

@Entity()
export class SportEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @OneToMany(() => ClubEntity, club => club.sport)
    clubs: ClubEntity[]

}