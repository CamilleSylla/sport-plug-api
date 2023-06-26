import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

@InputType()
export default class UpdateClubInputs{
    @Field({nullable: true})
    @IsOptional()
    @IsString()
    name?: string;
  
    @Field({nullable: true})
    @IsOptional()
    @IsString()
    adress?: string;
  
    @Field({nullable: true})
    @IsOptional()
    @IsString()
    city?: string;
  
    @Field({nullable: true})
    @IsOptional()
    @IsString()
    zip?: string;
  
    @Field({nullable: true})
    @IsOptional()
    @IsString()
    email?: string;
  
    @Field({nullable: true})
    @IsOptional()
    @IsString()
    phone?: string;
    
    @Field({nullable: true})
    @IsOptional()
    @IsString()
    logo?: string;
}