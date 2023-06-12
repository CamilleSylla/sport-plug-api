import { Module, forwardRef } from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CategorieResolver } from './categorie.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategorieEntity } from './categorie.entity';
import { SportModule } from 'src/sport/sport.module';
import { SportEntity } from 'src/sport/sport.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategorieEntity, SportEntity]),
    forwardRef(() => SportModule),
  ],
  providers: [CategorieService, CategorieResolver],
  exports: [CategorieService],
})
export class CategorieModule {}
