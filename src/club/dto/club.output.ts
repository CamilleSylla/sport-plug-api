import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ObjectType()
export class Club {
  @Field(() => ID)
  @IsString()
  id: string;

  @Field()
  @IsString()
  name: string;
}
