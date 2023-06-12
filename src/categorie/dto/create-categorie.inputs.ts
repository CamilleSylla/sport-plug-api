import { Field, InputType, PickType } from '@nestjs/graphql';
import { Categorie } from './categorie.outputs';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateCategorieInputs extends PickType(
  Categorie,
  ['name'] as const,
  InputType,
) {
    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    sportId: string;
}
