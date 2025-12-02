import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserProfileDto } from 'src/users/dto/user-profile.dto';

export class ArticleResponseDto {
  @ApiProperty({
    description: 'Unique slug of the article',
    example: 'how-to-learn-nestjs',
  })
  slug: string;

  @ApiProperty({
    description: 'Article title',
    example: 'How to learn NestJS',
  })
  title: string;

  @ApiProperty({
    description: 'Article description',
    example: 'description',
  })
  description: string;

  @ApiProperty({
    description: 'Article body content',
    example: 'content',
  })
  body: string;

  @ApiProperty({
    description: 'Article tags',
    example: ['nestjs', 'nodejs', 'javascript'],
  })
  tagList?: string[];

  @ApiProperty({
    description: 'Timestamp when the article was created',
    example: '2025-12-01T12:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the article was last updated',
    example: '2025-12-01T09:30:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Author profile',
    type: () => UserProfileDto,
  })
  author: UserProfileDto;

  static fromEntity(entity: any): ArticleResponseDto {
    const dto = new ArticleResponseDto();
    dto.slug = entity.slug;
    dto.title = entity.title;
    dto.description = entity.description;
    dto.body = entity.body;
    dto.tagList = dto.tagList = entity.tags?.map((articleTag: any) => articleTag.tag?.name) || [];
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    dto.author = UserProfileDto.fromEntity(entity.author);

    return dto;
  }
}
