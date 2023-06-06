import { InputType,PickType } from '@nestjs/graphql';
import { Club } from './club.output';
import { Sport } from 'src/sport/dto/sport.outputs';
@InputType()
export class CreateClubInput extends PickType(
    Club,
    ['name'] as const,
    InputType
){}