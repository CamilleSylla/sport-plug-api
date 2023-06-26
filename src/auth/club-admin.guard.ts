import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ClubService } from 'src/club/club.service';

@Injectable()
export class ClubAdminGuard implements CanActivate {
  constructor(private readonly clubService: ClubService) {}
  async canActivate(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    const { user, body } = gqlContext.getContext().req;
    const clubId = body.variables.id;
    return await this.clubService.userIsClubAdmin(user.id, clubId);    
  }
}
