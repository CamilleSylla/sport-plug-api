import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { SportService } from './sport.service';
import { CreateSportInputs } from './dto/create-sport-inputs';
import { Sport } from './dto/sport.outputs';
import { Categorie } from 'src/categorie/dto/categorie.outputs';
import { ModuleRef } from '@nestjs/core';


@Resolver(() => Sport)
export class SportResolver  {
  constructor(private readonly sportService: SportService, private moduleRef: ModuleRef) {}

  @Mutation(() => Sport)
  async createSport(
    @Args('sport', { type: () => CreateSportInputs }) sport: CreateSportInputs,
  ) {
    return await this.sportService.create(sport);
  }

  @Query(() => Sport)
  async sportById(@Args('id', { type: () => String }) id: string) {
    return await this.sportService.findById(id);
  }

  @Query(() => [Sport])
  async sports() {
    return await this.sportService.findAll();
  }

  @ResolveField(() => [Categorie], { name: 'categories' })
  async categorie(@Parent() sport: Sport) {
    return await this.sportService.categorie(sport.id);
  }


}
