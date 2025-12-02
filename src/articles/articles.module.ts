import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { UsersModule } from '../users/users.module';
import { PrismaModule } from 'prisma/prisma.module';
import { ArticlesRepository } from './articles.repository';

@Module({
  imports: [PrismaModule, UsersModule],
  providers: [ArticlesService, ArticlesRepository],
  controllers: [ArticlesController],
  exports: [ArticlesService],
})
export class ArticlesModule {}
