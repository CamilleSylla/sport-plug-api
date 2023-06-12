import { Module } from '@nestjs/common';
import { SportModule } from './sport/sport.module';
import { ClubModule } from './club/club.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { TeamModule } from './team/team.module';
import { CategorieModule } from './categorie/categorie.module';

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
      include: [ClubModule, SportModule, TeamModule, CategorieModule],
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    })
    ,
    SportModule,
    ClubModule,
    TeamModule,
    CategorieModule,
  ],
})
export class AppModule {}
