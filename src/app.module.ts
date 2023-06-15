import { Module } from '@nestjs/common';
import { SportModule } from './sport/sport.module';
import { ClubModule } from './club/club.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { TeamModule } from './team/team.module';
import { CategorieModule } from './categorie/categorie.module';
import { CompetitionModule } from './competition/competition.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'sportplug',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      include: [
        ClubModule,
        SportModule,
        TeamModule,
        CategorieModule,
        CompetitionModule,
        UsersModule,
        AuthModule
      ],
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    JwtModule.register({
      global: true,
      secret: "changeit",
      signOptions: { expiresIn: '1d' },
    }),
    SportModule,
    ClubModule,
    TeamModule,
    CategorieModule,
    CompetitionModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
