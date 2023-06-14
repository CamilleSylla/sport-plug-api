import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user-inputs';
import { plainToInstance } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignIn } from './dto/signin-outputs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async createOne(inputs: CreateUserInput) {
    const { password } = inputs;
    const user = plainToInstance(UserEntity, {
      ...inputs,
      password: await bcrypt.hash(password, 10),
    });
    const newUser = this.userRepository.create(user);
    const {password:_, ...payload} = await this.userRepository.save(newUser);
    const accessToken = this.jwtService.sign(payload);
    return plainToInstance(SignIn, { ...payload, accessToken });
  }

  async findOne(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}
