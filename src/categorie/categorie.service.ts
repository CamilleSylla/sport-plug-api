import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CategorieEntity } from './categorie.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategorieInputs } from './dto/create-categorie.inputs';
import { SportService } from 'src/sport/sport.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CategorieService {
  constructor(
    @InjectRepository(CategorieEntity)
    private readonly categorieRepository: Repository<CategorieEntity>,
    @Inject(forwardRef(() => SportService))
    private readonly sportService: SportService,
  ) {}
  async createOne(categorie: CreateCategorieInputs) {
    const sport = await this.sportService.findById(categorie.sportId);
    if (!sport) throw new BadRequestException('Sport not found');
    const newCategorie = this.categorieRepository.create(categorie);
    const newCategorieInstance = plainToInstance(CategorieEntity, {
      ...newCategorie,
      sport,
    });
    return await this.categorieRepository.save(newCategorieInstance);
  }

  async findByID(id: string) {
    return await this.sportService.findById(id);
  }

  async findAll() {
    return await this.categorieRepository.find();
  }

  async sport(id: string) {
    const categorie = await this.categorieRepository.findOne({
      where: { id },
      relations: ['sport'],
    });
    return categorie.sport;
  }
}
