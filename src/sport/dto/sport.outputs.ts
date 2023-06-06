import {ObjectType, Field} from '@nestjs/graphql'
import { IsString, IsNotEmpty } from 'class-validator';


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
}