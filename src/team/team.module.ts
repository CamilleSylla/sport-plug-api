import { Module, forwardRef } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamResolver } from './team.resolver';
import { TeamEntity } from './team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubModule } from 'src/club/club.module';
import { ClubService } from 'src/club/club.service';
import { ClubEntity } from 'src/club/club.entity';
import { SportEntity } from 'src/sport/sport.entity';
import { SportModule } from 'src/sport/sport.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([TeamEntity, ClubEntity, SportEntity]),
    forwardRef(() => ClubModule),
    forwardRef(() => SportModule),
  ],
  providers: [TeamService, TeamResolver, ClubService],
})
export class TeamModule {}
