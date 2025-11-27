import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignupDto } from '../auth/dto/signup.dto';
import { HASH_LENGTH } from 'src/common/constants/validate-user.constants';
import type { User } from '@prisma/client';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  async create(input: SignupDto): Promise<User> {
    const hashed = await bcrypt.hash(input.password, HASH_LENGTH);

    const userData = {
        email: input.email,
        username: input.username,
        password: hashed,
        bio: input.bio ?? undefined,
        image: input.image ?? undefined,
    };

    return this.usersRepository.create(userData);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    return isMatch ? user : null;
  }
}
