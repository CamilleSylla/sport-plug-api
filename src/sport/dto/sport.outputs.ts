import {ObjectType, Field} from '@nestjs/graphql'
import { IsString, IsNotEmpty } from 'class-validator';
import { Categorie } from 'src/categorie/dto/categorie.outputs';
import { Club } from 'src/club/dto/club.output';
import { Competition } from 'src/competition/dto/competition.outpouts';
import { Team } from 'src/team/dto/team.outputs';


@ObjectType()
export class Sport {
    @Field(() => String )
    @IsString()
    @IsNotEmpty()
    id: string;

    @Field(() => String )
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field(() => [Club])
    clubs: Club[];

    @Field(() => [Categorie])
    categories: Categorie[];

    @Field(() => [Team])
    teams: Team[];

    @Field(() => [Competition])
    competitions: Competition[];
}