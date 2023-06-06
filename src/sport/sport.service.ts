import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import { SportEntity } from './sport.entity';
import { CreateSportInputs } from './dto/create-sport-inputs';

@Injectable()
export class SportService {
    constructor(
        @InjectRepository(SportEntity)
        private readonly sportRepository: Repository<SportEntity>
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
}
