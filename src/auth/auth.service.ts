import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignIn } from 'src/users/dto/signin-outputs';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async signIn(email: string, password: string): Promise<SignIn> {
    const user = await this.usersService.findByEmail(email);
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const { password, ...payload } = user;
      const accessToken = this.jwtService.sign(payload);
      return plainToInstance(SignIn, { ...user, accessToken });
    }
    throw new BadRequestException('Invalid email or password');
  }
}
