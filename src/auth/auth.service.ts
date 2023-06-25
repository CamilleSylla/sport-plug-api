import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
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
      const { password, refreshToken: rf, ...payload } = user;
      const accessToken = this.jwtService.sign(payload);
      const refreshToken = this.jwtService.sign(payload, {
        expiresIn: '7d',
      });
      await this.usersService.updateOneRefreshToken(user.id, refreshToken);
      return plainToInstance(SignIn, { ...user, accessToken, refreshToken });
    }
    throw new BadRequestException('Invalid email or password');
  }

  async me(email: string) {
    const { password, refreshToken, ...user } =
      await this.usersService.findByEmail(email);
    const accessToken = this.jwtService.sign(user);
    return plainToInstance(SignIn, { ...user, accessToken, refreshToken });
  }

  async validate(jwt: string) {
    const user = await this.jwtService.verify(jwt);
    if (user) {
      return user;
    }
    throw new UnauthorizedException();
  }

  async refreshToken(refreshToken: string) {
    const refreshUser = await this.jwtService.verify(refreshToken);
    if (refreshUser) {
      return await this.me(refreshUser.email);
    }
  }

  async club(id: string) {
    return await this.usersService.getUserClub(id);
  }
}
