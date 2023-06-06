import { PickType, InputType } from '@nestjs/graphql';
import { Team } from './team.outputs';

@InputType()
export class CreateTeamInputs extends PickType(
  Team,
  ['name'] as const,
  InputType,
) {}
