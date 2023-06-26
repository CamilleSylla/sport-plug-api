import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { AuthModule } from 'src/auth/auth.module';
import { MediaModule } from 'src/media/media.module';
import { MediaService } from 'src/media/media.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClubModule } from 'src/club/club.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
    forwardRef(() => MediaModule),
    forwardRef(() => ConfigModule),
    forwardRef(() => ClubModule)
  ],
  providers: [UsersService, UsersResolver, MediaService, ConfigService],
  exports: [UsersService],
})
export class UsersModule {}
