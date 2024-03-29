import { Field, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Club } from "src/club/dto/club.output";

@ObjectType()
export class User {
    @Field()
    @IsString()
    @IsNotEmpty()
    id: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    firstname: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    lastname: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    email: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    password: string;

    @Field()
    @IsOptional()
    @IsString()
    refreshToken?: string;

    @Field(() => Club)
    @IsOptional()
    club: Club;
}