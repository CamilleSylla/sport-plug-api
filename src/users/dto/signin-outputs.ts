import { Field, ObjectType, OmitType } from "@nestjs/graphql";
import { User } from "./users.outputs";
import { IsString } from "class-validator";

@ObjectType()
export class SignIn extends OmitType(User, ["password", "club"] as const, ObjectType) {
    @Field()
    @IsString()
    accessToken: string;
}