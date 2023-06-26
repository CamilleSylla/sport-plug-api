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
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql.guard';
import { CurrentUser } from 'src/users/user.decorator';
import { UserEntity } from 'src/users/users.entity';
import { User } from 'src/users/dto/users.outputs';
import UpdateClubOutputs from './dto/update-club.inputs';
import UpdateClubInputs from './dto/update-club.inputs';
import { ClubAdminGuard } from 'src/auth/club-admin.guard';

@Resolver(() => Club)
export class ClubResolver {
  constructor(private readonly clubService: ClubService) {}

  @Mutation(() => Club)
  @UseGuards(GqlAuthGuard)
  async createClub(
    @Args('club', { type: () => CreateClubInput }) club: CreateClubInput,
    @Args('sportId', { type: () => String }) sportId: string,
    @CurrentUser() user: UserEntity,
  ) {
    //@todo clubId should be extract from inside the user token guard
    return await this.clubService.create(club, sportId, user);
  }

  @Mutation(() => Club)
  @UseGuards(GqlAuthGuard)
  async deleteClub(@Args('id', { type: () => String }) id: string) {
    //Add more checks
    return await this.clubService.delete(id);
  }

  @Mutation(() => Club)
  @UseGuards(GqlAuthGuard, ClubAdminGuard)
  async updateClub(
    @Args('id', { type: () => String }) id: string,
    @Args('club', { type: () => UpdateClubInputs }) club: UpdateClubInputs,
  ) {
    return await this.clubService.update(id, club);
  }

  @Query(() => [Club], { name: 'getAllClubs' })
  async getAllClubs() {
    return await this.clubService.findAll();
  }

  @Query(() => Club, { name: 'getClubByID' })
  async getClubByID(@Args('id', { type: () => String }) id: string) {
    return await this.clubService.findById(id);
  }

  @Query(() => Club, { name: 'findByUserId' })
  @UseGuards(GqlAuthGuard)
  async findByUserId(@CurrentUser() user: UserEntity) {
    return await this.clubService.findByUserId(user.id);
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
