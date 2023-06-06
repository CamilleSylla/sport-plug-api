import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SportService } from './sport.service';
import { CreateSportInputs } from './dto/create-sport-inputs';
import { Sport } from './dto/sport.outputs';

@Resolver()
export class SportResolver {
  constructor(private readonly sportService: SportService) {}

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
}
