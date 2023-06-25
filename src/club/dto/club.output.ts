import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Sport } from 'src/sport/dto/sport.outputs';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
export class Club {
  @Field(() => ID)
  @IsString()
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  adress: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  city: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  zip: string;

  @Field()
  @IsString()
  @IsOptional()
  email?: string;

  @Field()
  @IsString()
  @IsOptional()
  phone?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  createdBy: string;
  
  @Field()
  @IsString()
  @IsNotEmpty()
  updatedAt: Date;

  @Field(() => Sport)
  sport: Sport;

  @Field(() => Date)
  createdAt: Date;
}
