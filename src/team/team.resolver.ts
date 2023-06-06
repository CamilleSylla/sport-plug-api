import { Resolver, Mutation, Args, ResolveField, Parent, Query } from '@nestjs/graphql';
import { Team } from './dto/team.outputs';
import { TeamService } from './team.service';
import { CreateTeamInputs } from './dto/create-team-inputs';
import { Club } from 'src/club/dto/club.output';

@Resolver(() => Team)
export class TeamResolver {

    constructor(private readonly teamService: TeamService) {}

  @Mutation(() => Team, { name: 'createTeam' })
  async create(
    @Args('team', { type: () => CreateTeamInputs }) team: CreateTeamInputs,
    @Args('clubId', { type: () => String }) clubId: string,
  ) {
    //@todo clubId should be extract from inside the user token guard
    return await this.teamService.create(team, clubId);
  }

  @Query(() => Team, { name: 'getTeamByID' })
  async getTeamByID(@Args('id', { type: () => String }) id: string) {
    return await this.teamService.findById(id);
  }

  @ResolveField(() => Club, { name: 'club' })
  async sports(@Parent() team: Team) {
    return await this.teamService.getTeamClub(team.id);
  }
}
