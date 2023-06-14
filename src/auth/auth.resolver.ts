import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignIn } from 'src/users/dto/signin-outputs';

@Resolver()
export class AuthResolver {

    constructor( private readonly authService: AuthService) {}

    @Mutation(() => SignIn)
    async signIn(@Args('email') email: string, @Args('password') password: string) {
        return this.authService.signIn(email, password);
    }
}
