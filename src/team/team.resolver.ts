import { Resolver, Mutation, Args, ResolveField, Parent, Query } from '@nestjs/graphql';
import { Team } from './dto/team.outputs';
import { TeamService } from './team.service';
import { CreateTeamInputs } from './dto/create-team-inputs';
import { Club } from 'src/club/dto/club.output';
import { Categorie } from 'src/categorie/dto/categorie.outputs';
import { Sport } from 'src/sport/dto/sport.outputs';

@Resolver(() => Team)
export class TeamResolver {

    constructor(private readonly teamService: TeamService) {}

  @Mutation(() => Team, { name: 'createTeam' })
  async create(
    @Args('team', { type: () => CreateTeamInputs }) team: CreateTeamInputs,
  ) {
    //@todo clubId should be extract from inside the user token guard
    return await this.teamService.create(team);
  }

  @Query(() => Team, { name: 'getTeamByID' })
  async getTeamByID(@Args('id', { type: () => String }) id: string) {
    return await this.teamService.findById(id);
  }

  @ResolveField(() => Club, { name: 'club' })
  async club(@Parent() team: Team) {
    return await this.teamService.getTeamClub(team.id);
  }

  @ResolveField(() => Categorie, { name: 'categorie' })
  async categorie(@Parent() team: Team) {
    return await this.teamService.getTeamCategorie(team.id);
  }

  @ResolveField(() => Sport, { name: 'sport' })
  async sport(@Parent() team: Team) {
    return await this.teamService.getTeamSport(team.id);
  }
}
