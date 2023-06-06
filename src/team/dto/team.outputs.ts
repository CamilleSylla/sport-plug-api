import { Field, ObjectType } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@ObjectType()
export class Team {
  @Field()
  @IsString()
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;
}
