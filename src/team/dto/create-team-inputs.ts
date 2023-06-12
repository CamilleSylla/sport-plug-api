import { PickType, InputType, Field } from '@nestjs/graphql';
import { Team } from './team.outputs';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateTeamInputs extends PickType(
  Team,
  ['name'] as const,
  InputType,
) {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  categorieId: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  clubId: string;
}
