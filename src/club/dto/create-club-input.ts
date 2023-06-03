import { InputType,PickType } from '@nestjs/graphql';
import { Club } from './club.output';
@InputType()
export class CreateClubInput extends PickType(
    Club,
    ['name'] as const,
    InputType
){}