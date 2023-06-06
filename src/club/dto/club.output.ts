import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@ObjectType()
export class Club {
  @Field(() => ID)
  @IsString()
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;
}
