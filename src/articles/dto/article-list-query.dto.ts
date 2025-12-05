import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from 'src/common/constants/app.constants';

export class ArticleListQueryDto {
  @ApiPropertyOptional({
    description: 'Page number',
    default: DEFAULT_PAGE,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = DEFAULT_PAGE;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    default: DEFAULT_PER_PAGE,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = DEFAULT_PER_PAGE;

  @ApiPropertyOptional({
    description: 'Filter by tag name',
  })
  @IsOptional()
  @IsString()
  tag?: string;
}
