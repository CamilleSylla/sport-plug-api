import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Club } from './dto/club.output';
import { ClubService } from './club.service';
import { CreateClubInput } from './dto/create-club-input';

@Resolver(() => Club)
export class ClubResolver {
  constructor(private readonly clubService: ClubService) {}

  @Mutation(() => Club)
  async createClub(
    @Args('club', { type: () => CreateClubInput }) club: CreateClubInput,
  ) {
    return await this.clubService.create(club);
  }

  @Query(() => [Club], { name: 'getAllClubs' })
  async getAllClubs() {
    return await this.clubService.findAll();
  }

  @Query(() => Club, { name: 'getClubByID' })
  async getClubByID(@Args('id', { type: () => String }) id: string) {
    return await this.clubService.findById(id);
  }
}
