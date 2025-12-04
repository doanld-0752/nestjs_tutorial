import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { ArticlesModule } from '../articles/articles.module';

@Module({
  imports: [
    PrismaModule,
    ArticlesModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
