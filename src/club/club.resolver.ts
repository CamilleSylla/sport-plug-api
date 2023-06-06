import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Club } from './dto/club.output';
import { ClubService } from './club.service';
import { CreateClubInput } from './dto/create-club-input';
import { Sport } from 'src/sport/dto/sport.outputs';

@Resolver(() => Club)
export class ClubResolver {
  constructor(private readonly clubService: ClubService) {}

  @Mutation(() => Club)
  async createClub(
    @Args('club', { type: () => CreateClubInput }) club: CreateClubInput,
    @Args('sportId', { type: () => String }) sportId: string,
  ) {
    return await this.clubService.create({ club, sportId });
  }

  @Query(() => [Club], { name: 'getAllClubs' })
  async getAllClubs() {
    return await this.clubService.findAll();
  }

  @Query(() => Club, { name: 'getClubByID' })
  async getClubByID(@Args('id', { type: () => String }) id: string) {
    return await this.clubService.findById(id);
  }

  @ResolveField(() => Sport, { name: 'sport' })
  async sports(@Parent() club: Club) {
    return await this.clubService.getClubSports(club.id);
  }
}
