import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user-inputs';
import { User } from './dto/users.outputs';
import { UsersService } from './users.service';
import { SignIn } from './dto/signin-outputs';

@Resolver()
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
}
