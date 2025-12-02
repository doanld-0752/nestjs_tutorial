import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import type { Article, Tag } from '@prisma/client';
import defaultSlugify from 'slugify';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesRepository {
  constructor(private prisma: PrismaService) {}

  async create(authorId: number, input: CreateArticleDto) {
    const tagsToConnect = await this.handleTags(input.tagList || []);
    const slug = this.generateSlug(input.title);

    return this.prisma.article.create({
      data: {
        slug: slug,
        title: input.title,
        description: input.description,
        body: input.body,
        author: {
          connect: { id: authorId },
        },
        tags: {
          create: tagsToConnect.map((tag) => ({
            tag: { connect: { id: tag.id } },
          })),
        },
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
        author: true,
      },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.article.findUnique({
      where: { slug },
      include: {
        author: true,
        tags: {
          include: { tag: true },
        },
      },
    });
  }

  async update(articleId: number, input: UpdateArticleDto) {
    const { tagList, ...articleUpdateData } = input;
    if (articleUpdateData.title) {
      (articleUpdateData as any).slug = await this.generateSlug(articleUpdateData.title);
    }

    let tagsUpdateQuery: any;

    if (tagList) {
      const tagsToConnect = await this.handleTags(tagList);
      tagsUpdateQuery = {
        deleteMany: {},
        create: tagsToConnect.map((tag) => ({
          tag: { connect: { id: tag.id } },
        })),
      };
    }

    return this.prisma.article.update({
      where: { id: articleId },
      data: {
        ...articleUpdateData,
        tags: tagsUpdateQuery,
      },
      include: {
        author: true,
        tags: {
          include: { tag: true },
        },
      },
    });
  }

  async delete(articleId: number) {
    return this.prisma.article.delete({
      where: { id: articleId },
    });
  }

  // --- PRIVATE METHODS ---

  private async handleTags(tagList: string[]): Promise<Tag[]> {
    const existingTags = await this.prisma.tag.findMany({
      where: {
        name: { in: tagList },
      },
    });

    const existingtagList = existingTags.map(tag => tag.name);
    const newtagList = tagList.filter(name => !existingtagList.includes(name));

    const newTags = await Promise.all(
      newtagList.map(name =>
        this.prisma.tag.create({ data: { name } }),
      ),
    );

    return [...existingTags, ...newTags];
  }

  private generateSlug(title: string): string {
    return defaultSlugify(title, {
      lower: true,      // Chuyển thành chữ thường
      strict: true,     // Loại bỏ ký tự đặc biệt
      trim: true,       // Bỏ khoảng trắng
      locale: 'vi'      // Hỗ trợ tiếng Việt
    });
  }
}
