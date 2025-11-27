import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import type { User } from '@prisma/client';
import { EXPIRATION_TIME } from 'src/common/constants/auth.const';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(input: SignupDto) {
    const existingEmail = await this.usersService.findByEmail(input.email);
    if (existingEmail) {
      throw new UnauthorizedException('Email is taken');
    }

    const user = await this.usersService.create(input);

    return this.generateToken(user);
  }

  async authenticateUser(input: LoginDto) {
    const {email, password} = input;
    const user = await this.usersService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email
    };

    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: EXPIRATION_TIME
      })
    };
  }
}
