import { Field, InputType, PickType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator';
import { User } from './users.outputs';

@InputType()
export class CreateUserInput extends PickType(
  User,
  ['firstname', 'lastname', 'email', 'password'] as const,
  InputType,
) {}
