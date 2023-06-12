import { Field, InputType, PickType } from '@nestjs/graphql';
import { Competition } from './competition.outpouts';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateCompetitionInputs extends PickType(
  Competition,
  ['name'] as const,
  InputType,
) {
    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    sportId: string;
    
    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    categorieId: string;
}
