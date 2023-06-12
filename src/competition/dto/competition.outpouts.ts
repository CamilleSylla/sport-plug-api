import { Field, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";
import { Categorie } from "src/categorie/dto/categorie.outputs";
import { Sport } from "src/sport/dto/sport.outputs";
import { Team } from "src/team/dto/team.outputs";

@ObjectType()
export class Competition {
    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    id: string;

    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field(() => Sport)
    sport: Sport;

    @Field(() => [Team])
    teams: Team[];

    @Field(() => Categorie)
    categories: Categorie;
}