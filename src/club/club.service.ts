import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClubInput } from './dto/create-club-input';
import { ClubEntity } from './club.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SportService } from 'src/sport/sport.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(ClubEntity)
    private readonly clubRepository: Repository<ClubEntity>,
    private readonly sportService: SportService,
  ) {}

  async create(data: { club: CreateClubInput; sportId: string }) {
    const club = this.clubRepository.create(data.club);
    const sport = await this.sportService.findById(data.sportId);
    if (!sport) throw new BadRequestException('Sport not found');
    const entity = plainToInstance(ClubEntity, { ...club, sport });
    return this.clubRepository.save(entity);
  }

  async findAll() {
    return await this.clubRepository.find();
  }
  async findById(id: string) {
    return await this.clubRepository.findOne({ where: { id } });
  }

  async getClubTeams(id: string) {
    const club = await this.clubRepository.findOne({
      where: { id },
      relations: ['teams'],
    });
    return club.teams;
  }
  
  async getClubSports(id: string) {
    const club = await this.clubRepository.findOne({
      where: { id },
      relations: ['sport'],
    });
    return club.sport;
  }
}
