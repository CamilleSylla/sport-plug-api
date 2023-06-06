import { PickType, InputType } from '@nestjs/graphql';
import { Sport } from './sport.outputs';
@InputType()
export class CreateSportInputs extends PickType(Sport, ['name'], InputType) {}
