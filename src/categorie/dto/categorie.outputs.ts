import {ObjectType, Field} from '@nestjs/graphql'
import { IsString, IsNotEmpty } from 'class-validator';
import { Team } from 'src/team/dto/team.outputs';
import { Sport } from 'src/sport/dto/sport.outputs';

@ObjectType()
export class Categorie {
    @Field()
    @IsString()
    @IsNotEmpty()
    id: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field(() => [Team])
    teams: Team[];

    @Field(() => Sport)
    sport: Sport;
}