import { Module, forwardRef } from '@nestjs/common';
import { CompetitionService } from './competition.service';
import { CompetitionResolver } from './competition.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetitionEntity } from './competition.entity';
import { SportModule } from 'src/sport/sport.module';
import { CategorieModule } from 'src/categorie/categorie.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompetitionEntity]),
    forwardRef(() => SportModule),
    forwardRef(() => CategorieModule),
  ],
  providers: [CompetitionService, CompetitionResolver],
  exports: [CompetitionService]
})
export class CompetitionModule {}