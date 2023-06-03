import { Module } from '@nestjs/common';
import { ClubService } from './club.service';
import { ClubResolver } from './club.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubEntity } from './club.entity';

@Module({
  imports : [TypeOrmModule.forFeature([ClubEntity])],
  providers: [ClubResolver, ClubService ]
})
export class ClubModule {}
