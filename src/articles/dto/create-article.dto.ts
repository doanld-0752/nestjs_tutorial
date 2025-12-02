import { IsString, IsNotEmpty, MinLength, MaxLength, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { i18nValidationMessage } from 'nestjs-i18n';
import { SETTING_FIELD_LENGTH } from 'src/common/constants/app.constants';

export class CreateArticleDto {
  @ApiProperty({
    description: 'Article title',
    example: 'How to learn NestJS',
    minLength: SETTING_FIELD_LENGTH.ARTICLE.TITLE_MIN,
    maxLength: SETTING_FIELD_LENGTH.ARTICLE.TITLE_MAX
  })
  @IsString()
  @IsNotEmpty({
    message: i18nValidationMessage('article.validation.titleRequired')
  })
  @MinLength(SETTING_FIELD_LENGTH.ARTICLE.TITLE_MIN, {
    message: i18nValidationMessage('article.validation.titleTooShort', {
      minLength: SETTING_FIELD_LENGTH.ARTICLE.TITLE_MIN
    })
  })
  @MaxLength(SETTING_FIELD_LENGTH.ARTICLE.TITLE_MAX, {
    message: i18nValidationMessage('article.validation.titleTooLong', {
      maxLength: SETTING_FIELD_LENGTH.ARTICLE.TITLE_MAX
    })
  })
  title: string;

  @ApiProperty({
    description: 'Article description',
    example: 'A comprehensive guide to learning NestJS framework',
    minLength: SETTING_FIELD_LENGTH.ARTICLE.DESCRIPTION_MIN,
    maxLength: SETTING_FIELD_LENGTH.ARTICLE.DESCRIPTION_MAX
  })
  @IsString()
  @IsNotEmpty({
    message: i18nValidationMessage('article.validation.descriptionRequired')
  })
  @MinLength(SETTING_FIELD_LENGTH.ARTICLE.DESCRIPTION_MIN, {
    message: i18nValidationMessage('article.validation.descriptionTooShort', {
      minLength: SETTING_FIELD_LENGTH.ARTICLE.DESCRIPTION_MIN
    })
  })
  @MaxLength(SETTING_FIELD_LENGTH.ARTICLE.DESCRIPTION_MAX, {
    message: i18nValidationMessage('article.validation.descriptionTooLong', {
      maxLength: SETTING_FIELD_LENGTH.ARTICLE.DESCRIPTION_MAX
    })
  })
  description: string;

  @ApiProperty({
    description: 'Article body content',
    example: '# Introduction\n\nNestJS is a progressive Node.js framework...',
    minLength: SETTING_FIELD_LENGTH.ARTICLE.BODY_MIN,
    maxLength: SETTING_FIELD_LENGTH.ARTICLE.BODY_MAX
  })
  @IsString()
  @IsNotEmpty({
    message: i18nValidationMessage('article.validation.bodyRequired')
  })
  @MinLength(SETTING_FIELD_LENGTH.ARTICLE.BODY_MIN, {
    message: i18nValidationMessage('article.validation.bodyTooShort', {
      minLength: SETTING_FIELD_LENGTH.ARTICLE.BODY_MIN
    })
  })
  @MaxLength(SETTING_FIELD_LENGTH.ARTICLE.BODY_MAX, {
    message: i18nValidationMessage('article.validation.bodyTooLong', {
      maxLength: SETTING_FIELD_LENGTH.ARTICLE.BODY_MAX
    })
  })
  body: string;

  @ApiPropertyOptional({
    description: 'Article tags',
    example: ['nestjs', 'nodejs', 'javascript'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tagList?: string[];
}
