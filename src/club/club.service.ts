import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateClubInput } from './dto/create-club-input';
import { ClubEntity } from './club.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SportService } from 'src/sport/sport.service';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from 'src/users/users.entity';
import UpdateClubOutputs from './dto/update-club.inputs';

@Injectable()
export class ClubService {
  private readonly logger = new Logger(ClubService.name);
  constructor(
    @InjectRepository(ClubEntity)
    private readonly clubRepository: Repository<ClubEntity>,
    private readonly sportService: SportService,
  ) {}

  async create(club: CreateClubInput, sportId: string, user: UserEntity) {
    const clubInstance = this.clubRepository.create(club);
    const sport = await this.sportService.findById(sportId);
    if (!sport) throw new BadRequestException('Sport not found');
    const entity = plainToInstance(ClubEntity, {
      ...clubInstance,
      sport,
      users: [user],
      kams: [user],
      createdBy: user.email,
    });

    return this.clubRepository.save(entity);
  }

  async findAll() {
    return await this.clubRepository.find();
  }
  async findById(id: string) {
    return await this.clubRepository.findOne({
      where: { id },
      relations: ['sport'],
    });
  }

  async delete(id: string) {
    return await this.clubRepository.delete(id);
  }

  async update(id: string, club: UpdateClubOutputs) {
    await this.clubRepository.update(id, club);
    return await this.findById(id)
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

  async findByUserId(userId: string) {
    const club = await this.clubRepository.findOne({
      where: { users: { id: userId } },
    });
    this.logger.log(
      `user ${userId} is browsing as admin for club ${club.id} ${club.name}`,
    );
    return club;
  }

  async userIsClubAdmin(userId: string, clubId: string) {
    const club = await this.clubRepository
      .createQueryBuilder('club')
      .leftJoinAndSelect('club.kams', 'kams')
      .where('club.id = :id', { id: clubId })
      .andWhere('kams.id = :userId', { userId: userId })
      .getOne();
    return club ? true : false;
  }
}
