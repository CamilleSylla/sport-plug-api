import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SportEntity } from './sport.entity';
import { CreateSportInputs } from './dto/create-sport-inputs';
import { CategorieService } from 'src/categorie/categorie.service';

@Injectable()
export class SportService {
  constructor(
    @InjectRepository(SportEntity)
    private readonly sportRepository: Repository<SportEntity>,
    @Inject(forwardRef(() => CategorieService))
    private readonly categorieService: CategorieService,
  ) {}

  async create(sport: CreateSportInputs) {
    return await this.sportRepository.save(sport);
  }

  async findAll() {
    return await this.sportRepository.find();
  }

  async findById(id: string) {
    return await this.sportRepository.findOne({ where: { id } });
  }

  async sport(id: string) {
    return await this.sportRepository.findOne({ where: { id } });
  }

  async categorie(id: string) {
    const sport = await this.sportRepository.findOne({
      where: { id },
      relations: ['categories'],
    });
    return sport.categories;
  }

  async club(id: string) {
    const sport = await this.sportRepository.findOne({
      where: { id },
      relations: ['clubs'],
    });
    return sport.clubs;
  }

  async team(id: string) {
    const sport = await this.sportRepository.findOne({
      where: { id },
      relations: ['teams'],
    });
    return sport.teams;
  }
}
