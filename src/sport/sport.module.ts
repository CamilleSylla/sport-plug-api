import { Module, forwardRef } from '@nestjs/common';
import { SportResolver } from './sport.resolver';
import { SportService } from './sport.service';
import { SportEntity } from './sport.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategorieEntity } from 'src/categorie/categorie.entity';
import { CategorieModule } from 'src/categorie/categorie.module';
import { CompetitionModule } from 'src/competition/competition.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([SportEntity, CategorieEntity]),
    forwardRef(() => CategorieModule),
    forwardRef(() => CompetitionModule)
  ],
  providers: [SportResolver, SportService],
  exports: [SportService],
})
export class SportModule {}
