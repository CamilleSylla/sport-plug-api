import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user-inputs';
import { User } from './dto/users.outputs';
import { UsersService } from './users.service';
import { SignIn } from './dto/signin-outputs';
import { Club } from 'src/club/dto/club.output';

@Resolver(() => User)
export class UsersResolver {

    constructor(private readonly usersService: UsersService) {}

    @Mutation(() => SignIn)
    async createUser(@Args('user', { type: () => CreateUserInput }) user: CreateUserInput) {
        return this.usersService.createOne(user);
    }

    @Query(() => User)
    async findOne(@Args('id', { type: () => String }) id: string) {
        return this.usersService.findOne(id);
    }

    @ResolveField(() => Club)
    async findByEmail(@Parent() user: User) {
        return await this.usersService.getUserClub(user.id);
    }
}
