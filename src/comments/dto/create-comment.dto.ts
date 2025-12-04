import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { i18nValidationMessage } from 'nestjs-i18n';
import { SETTING_FIELD_LENGTH } from 'src/common/constants/app.constants';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Content of the comment',
    example: 'This is a comment body text.',
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
}
