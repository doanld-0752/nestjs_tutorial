import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleResponseDto } from './dto/article-response.dto';
import { UsersService } from '../users/users.service';
import { I18nService } from 'nestjs-i18n';
import { ArticlesRepository } from './articles.repository';

@Injectable()
export class ArticlesService {
  constructor(
    private articleRepo: ArticlesRepository,
    private readonly userService: UsersService,
    private readonly i18n: I18nService,
  ) {}

  async create(authorId: number, input: CreateArticleDto): Promise<ArticleResponseDto> {
    const author = await this.userService.findById(authorId);
    if (!author) {
      throw new NotFoundException(this.i18n.translate('article.not_found.user'));
    }

    try {
      const article = await this.articleRepo.create(author.id, input);

      return ArticleResponseDto.fromEntity(article as any);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(this.i18n.translate('article.validation.titleAlreadyExists'));
      }

      throw error;
    }
  }

  async getArticle(slug: string): Promise<ArticleResponseDto> {
    const article = await this.findArticleOrThrow(slug);

    return ArticleResponseDto.fromEntity(article);
  }

  async update(slug: string, authorId: number, input: UpdateArticleDto): Promise<ArticleResponseDto> {
    const article = await this.findArticleOrThrow(slug);
    if (article.authorId !== authorId) {
      throw new NotFoundException(this.i18n.translate('article.validation.permissionDenied'));
    }

    try {
      const updatedArticle = await this.articleRepo.update(article.id, input);

      return ArticleResponseDto.fromEntity(updatedArticle as any);

    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          this.i18n.translate('article.validation.titleAlreadyExists')
        );
      }
      throw error;
    }
  }

  async delete(slug: string, authorId: number): Promise<void> {
    const article = await this.findArticleOrThrow(slug);
    if (article.authorId !== authorId) {
      throw new NotFoundException(this.i18n.translate('article.validation.permissionDenied'));
    }
    await this.articleRepo.delete(article.id);
  }

  private async findArticleOrThrow(slug: string) {
    const article = await this.articleRepo.findBySlug(slug);
    if (!article) {
      throw new NotFoundException(this.i18n.translate('article.not_found.article'));
    }
    return article;
  }
}
