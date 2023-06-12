import { Args, Mutation, Parent, ResolveField, Resolver, Query } from '@nestjs/graphql';
import { Categorie } from './dto/categorie.outputs';
import { CreateCategorieInputs } from './dto/create-categorie.inputs';
import { CategorieService } from './categorie.service';
import { Sport } from 'src/sport/dto/sport.outputs';

@Resolver(() => Categorie)
export class CategorieResolver  {
  constructor(private readonly categorieService: CategorieService) {}

  @Mutation(() => Categorie)
  async createCategorie(
    @Args('categorie', { type: () => CreateCategorieInputs })
    categorie: CreateCategorieInputs,
  ) {
    return await this.categorieService.createOne(categorie);
  }

  @Query(() => [Categorie])
  async categories() {
    return await this.categorieService.findAll();
  }

  @ResolveField(() => Sport, { name: 'sport' })
  async sport(@Parent() categorie: Categorie) {
    return await this.categorieService.sport(categorie.id);
  }
}
