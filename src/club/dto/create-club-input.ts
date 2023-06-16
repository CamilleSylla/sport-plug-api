import { Field, InputType, PickType } from '@nestjs/graphql';
import { Club } from './club.output';
import { Sport } from 'src/sport/dto/sport.outputs';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
@InputType()
export class CreateClubInput extends PickType(
  Club,
  ['name', 'adress', 'city', 'zip', 'email', 'phone'] as const,
  InputType,
) {}
