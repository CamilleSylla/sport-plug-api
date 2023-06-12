import { BadRequestException, Injectable } from '@nestjs/common';
import { TeamEntity } from './team.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeamInputs } from './dto/create-team-inputs';
import { ClubService } from 'src/club/club.service';
import { plainToInstance } from 'class-transformer';
import { CategorieService } from 'src/categorie/categorie.service';
import { CompetitionService } from 'src/competition/competition.service';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly teamRepository: Repository<TeamEntity>,
    private readonly clubService: ClubService,
    private readonly categorieService: CategorieService,
    private readonly competitionService: CompetitionService,
  ) {}

  async create(team: CreateTeamInputs) {
    const teamEntity = this.teamRepository.create(team);
    const categorie = await this.categorieService.findByID(team.categorieId);
    const club = await this.clubService.findById(team.clubId);
    const competition = await this.competitionService.findById(
      team.competitionId,
    )
    if (!club) throw new BadRequestException('Club not found');
    if (!categorie) throw new BadRequestException('Category not found');
    if (!competition) throw new BadRequestException('Competition not found');
    const entity = plainToInstance(TeamEntity, {
      ...teamEntity,
      club,
      categorie,
      competition,
      sport: club.sport,
    });
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

  async getTeamCategorie(id: string) {
    const team = await this.teamRepository.findOne({
      where: { id },
      relations: ['categorie'],
    });
    return team.categorie;
  }

  async getTeamSport(id: string) {
    const team = await this.teamRepository.findOne({
      where: { id },
      relations: ['sport'],
    });
    return team.sport;
  }

  async competition(id: string) {
    const { competition } = await this.teamRepository.findOne({
      where: { id },
      relations: ['competition'],
    });
    return competition;
  }
}
