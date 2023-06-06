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
import { Team } from 'src/team/dto/team.outputs';

@Resolver(() => Club)
export class ClubResolver {
  constructor(private readonly clubService: ClubService) {}

  @Mutation(() => Club)
  async createClub(
    @Args('club', { type: () => CreateClubInput }) club: CreateClubInput,
    @Args('sportId', { type: () => String }) sportId: string,
  ) {
    //@todo clubId should be extract from inside the user token guard
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

  @ResolveField(() => [Team], { name: 'teams' })
  async teams(@Parent() club: Club) {
    return await this.clubService.getClubTeams(club.id);
  }

  @ResolveField(() => Sport, { name: 'sport' })
  async sports(@Parent() club: Club) {
    return await this.clubService.getClubSports(club.id);
  }
}
