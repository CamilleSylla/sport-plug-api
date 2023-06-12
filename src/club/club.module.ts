import { Module, forwardRef } from '@nestjs/common';
import { ClubService } from './club.service';
import { ClubResolver } from './club.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubEntity } from './club.entity';
import { SportModule } from 'src/sport/sport.module';
import { SportService } from 'src/sport/sport.service';
import { SportEntity } from 'src/sport/sport.entity';
import { CategorieModule } from 'src/categorie/categorie.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClubEntity, SportEntity]),
    forwardRef(() => SportModule),
    forwardRef(() => CategorieModule),
  ],
  providers: [ClubResolver, ClubService, SportService],
  exports: [ClubService],
})
export class ClubModule {}
