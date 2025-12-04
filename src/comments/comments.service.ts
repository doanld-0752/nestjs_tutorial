import { Injectable, NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { CommentResponseDto } from './dto/comment-response.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import type { User } from '@prisma/client';
import { ArticlesService } from '../articles/articles.service';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(
    private readonly articleService: ArticlesService,
    private readonly i18n: I18nService,
    private prisma: PrismaService,
  ) {}

  async create(user: User, slug: string, input: CreateCommentDto): Promise<CommentResponseDto> {
    const article = await this.articleService.findArticleOrThrow(slug);

    if (article.authorId !== user.id) {
      throw new NotFoundException(this.i18n.translate('article.validation.permissionDenied'));
    }

    const savedComment = await this.prisma.comment.create({
      data: {
        body: input.body,
          authorId: user.id,
          articleId: article.id,
        },
      include: {
        author: true
      }
    });

    return CommentResponseDto.fromEntity(savedComment);
  }

  async getList(slug: string): Promise<CommentResponseDto[]> {
    const article = await this.articleService.findArticleOrThrow(slug);
    const comments = await this.prisma.comment.findMany({
      where: {
        articleId: article.id
      },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return comments.map(comment => CommentResponseDto.fromEntity(comment));
  }

  async delete(user: User, slug: string, commentId: number): Promise<{ message: string } > {
    try {
      const article = await this.articleService.findArticleOrThrow(slug);
      const comment = await this.prisma.comment.findFirst({ where: {
        id: commentId,
        authorId: user.id,
        articleId: article.id
      }});

      if (!comment) {
        throw new Error(this.i18n.translate('massage.not_found.comment'));
      }

      await this.prisma.comment.delete({ where: { id: comment.id } });

      return { message: this.i18n.translate('message.success.comment_deleted') };
    } catch {
      throw new Error(this.i18n.translate('message.error.cannot_delete_comment'));
    }
  }
}
