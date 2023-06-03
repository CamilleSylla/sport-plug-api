import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity()
export class ClubEntity {

    @PrimaryGeneratedColumn()
    id:string;

    @Column()
    name: string;


}