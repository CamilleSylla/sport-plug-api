import { BadRequestException, Injectable } from '@nestjs/common';
import { TeamEntity } from './team.entity';
import {Repository} from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeamInputs } from './dto/create-team-inputs';
import { ClubService } from 'src/club/club.service';
import { plainToInstance} from 'class-transformer'



@Injectable()
export class TeamService {

    constructor(
        @InjectRepository(TeamEntity)
        private readonly teamRepository: Repository<TeamEntity>,
        private readonly clubService: ClubService
        ) {}

        async create(team: CreateTeamInputs, clubId: string) {
            const teamEntity = this.teamRepository.create(team);
            const club = await this.clubService.findById(clubId);
            if (!club) throw new BadRequestException('Club not found');
            const entity = plainToInstance(TeamEntity, {...teamEntity, club});
            return this.teamRepository.save(entity);
        }

        async findById(id: string) {
            return await this.teamRepository.findOne({ where: { id } });
        }


        async getTeamClub(id: string) {
            const team = await this.teamRepository.findOne({
              where: { id },
              relations: ['club'],
            });
            return team.club;
          }
}
