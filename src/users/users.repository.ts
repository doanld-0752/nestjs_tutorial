import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SignupDto } from '../auth/dto/signup.dto';
import type { User } from '@prisma/client';
import { PASSWORD_CONFIRMATION_FIELD } from  'src/common/constants/validate-user.constants';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findOne(userID: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: {id: userID} });
  }

  async create(userData: Omit<SignupDto, typeof PASSWORD_CONFIRMATION_FIELD> & { password: string }): Promise<User> {
    return this.prisma.user.create({ data: userData });
  }
}
