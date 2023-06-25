import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignIn } from 'src/users/dto/signin-outputs';
import { GqlAuthGuard } from './gql.guard';
import {UseGuards} from '@nestjs/common'
import { CurrentUser } from 'src/users/user.decorator';
import { Club } from 'src/club/dto/club.output';

@Resolver(() => SignIn)
export class AuthResolver {

    constructor( private readonly authService: AuthService) {}

    @Query(() => SignIn)
    async signIn(@Args('email') email: string, @Args('password') password: string) {
        return this.authService.signIn(email, password);
    }

    @Query(() => SignIn)
    @UseGuards(GqlAuthGuard)
    async me (@CurrentUser() user: SignIn) {
        const signIn = await this.authService.me(user.email);
        return signIn;
        
    }

    @Mutation(() => SignIn)
    async refreshToken(@Args('refreshToken') refreshToken: string) {
        return this.authService.refreshToken(refreshToken);
    }

    @ResolveField(() => Club)
    async club(@Parent() user: SignIn) {
        return await this.authService.club(user.id);
    }
}
