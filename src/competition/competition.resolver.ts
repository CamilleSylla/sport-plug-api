import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Competition } from './dto/competition.outpouts';
import { CompetitionService } from './competition.service';
import { CreateCompetitionInputs } from './dto/create-competition.inputs';
import { Sport } from 'src/sport/dto/sport.outputs';
import { SportService } from 'src/sport/sport.service';
import { Categorie } from 'src/categorie/dto/categorie.outputs';

@Resolver(() => Competition)
export class CompetitionResolver {
  constructor(private readonly competitionService: CompetitionService) {}

  @Mutation(() => Competition)
  async createCompetition(
    @Args('competition', { type: () => CreateCompetitionInputs })
    competition: CreateCompetitionInputs,
  ) {
    return await this.competitionService.createOne(competition);
  }

  @Query(() => [Competition], { name: 'competitions' })
  async findAll() {
    return await this.competitionService.findAll();
  }

  @Query(() => [Competition], { name: 'competitionsBySport' })
  async findAllBySport(@Args('sportId', { type: () => String }) sportId: string) {
    return await this.competitionService.findAllBySport(sportId);
  }

  @ResolveField(() => Sport, { name: 'sport' })
  async sport(@Parent() competition: Competition) {
    return await this.competitionService.sport(competition.id);
  }

  @ResolveField(() => Categorie, { name: 'categorie' })
  async categorie(@Parent() competition: Competition) {
    return await this.competitionService.categorie(competition.id);
  }
}
