import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user-inputs';
import { plainToInstance } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignIn } from './dto/signin-outputs';
import { MediaService } from 'src/media/media.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly mediaService: MediaService
  ) {}

  async createOne(inputs: CreateUserInput) {
    const { password } = inputs;
    const user = plainToInstance(UserEntity, {
      ...inputs,
      password: await bcrypt.hash(password, 10),
    });

    const newUser = this.userRepository.create(user);
    const { password: _, ...payload } = await this.userRepository.save(newUser);
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });
    await this.userRepository.update(newUser.id, { refreshToken });
    return plainToInstance(SignIn, { ...payload, accessToken, refreshToken });
  }

  async findOne(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async updateOneRefreshToken(id: string, refreshToken: string) {
    return this.userRepository.update(id, { refreshToken });
  }

  async getUserClub(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['club'],
    });
    return user.club;
  }
}
