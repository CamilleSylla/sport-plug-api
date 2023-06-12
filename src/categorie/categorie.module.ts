import { Module, forwardRef } from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CategorieResolver } from './categorie.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategorieEntity } from './categorie.entity';
import { SportModule } from 'src/sport/sport.module';
import { SportEntity } from 'src/sport/sport.entity';
import { CompetitionModule } from 'src/competition/competition.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategorieEntity, SportEntity]),
    forwardRef(() => SportModule),
    forwardRef(() => CompetitionModule),
  ],
  providers: [CategorieService, CategorieResolver],
  exports: [CategorieService],
})
export class CategorieModule {}
