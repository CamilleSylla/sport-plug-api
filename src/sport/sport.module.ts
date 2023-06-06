import { Module, forwardRef } from '@nestjs/common';
import { SportResolver } from './sport.resolver';
import { SportService } from './sport.service';
import { SportEntity } from './sport.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubModule } from 'src/club/club.module';
@Module({
  imports: [TypeOrmModule.forFeature([SportEntity])],
  providers: [SportResolver, SportService],
  exports: [SportService],
})
export class SportModule {}
