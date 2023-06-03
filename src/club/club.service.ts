import { Injectable } from '@nestjs/common';
import { CreateClubInput } from './dto/create-club-input';
import { ClubEntity } from './club.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(ClubEntity)
    private readonly clubRepository: Repository<ClubEntity>,
  ) {}

  async create(club: CreateClubInput) {
    return await this.clubRepository.save(club);
  }

  async findAll() {
    return await this.clubRepository.find();
  }
  async findById(id: string) {
    return await this.clubRepository.findOne({ where: { id } });
  }
}
