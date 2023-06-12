import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompetitionEntity } from './competition.entity';
import { Repository } from 'typeorm';
import { CreateCompetitionInputs } from './dto/create-competition.inputs';
import { SportService } from 'src/sport/sport.service';
import { CategorieService } from 'src/categorie/categorie.service';
import { plainToInstance } from 'class-transformer';
import { TeamService } from 'src/team/team.service';

@Injectable()
export class CompetitionService {
  constructor(
    @InjectRepository(CompetitionEntity)
    private readonly competitionRepository: Repository<CompetitionEntity>,
    @Inject(forwardRef(() => SportService))
    private readonly sportService: SportService,
    @Inject(forwardRef(() => CategorieService))
    private readonly categorieService: CategorieService,
  ) {}

  async createOne(competition: CreateCompetitionInputs) {
    const sport = await this.sportService.findById(competition.sportId);
    const categorie = await this.categorieService.findByID(
      competition.categorieId,
    );
    if (!sport) throw new BadRequestException('Sport not found');
    if (!categorie) throw new BadRequestException('Categorie not found');
    const newCompetition = this.competitionRepository.create(competition);
    const newCompetitionInstance = plainToInstance(CompetitionEntity, {
      ...newCompetition,
      sport,
      categorie,
    });
    return await this.competitionRepository.save(newCompetitionInstance);
  }

  async findById(id: string) {
    return await this.competitionRepository.findOne({ where: { id } });
  }

  async findAllBySport(id: string) {
    return await this.competitionRepository.createQueryBuilder('competition')
    .where('competition.sportId = :id', { id })
    .getMany();
  }

  async findAll() {
    return await this.competitionRepository.find();
  }

  async sport(id: string) {
    const { sport } = await this.competitionRepository.findOne({
      where: { id },
      relations: ['sport'],
    });
    return sport;
  }

  async categorie(id: string) {
    const {categorie} = await this.competitionRepository.findOne({
      where: { id },
      relations: ['categorie'],
    });
    return categorie;
  }
}
