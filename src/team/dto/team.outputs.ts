import { Field, ObjectType } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';
import { Categorie } from 'src/categorie/dto/categorie.outputs';
import { Club } from 'src/club/dto/club.output';

@ObjectType()
export class Team {
  @Field()
  @IsString()
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => Club)
  club: Club;

  @Field(() => Categorie)
  categorie: Categorie;
}
