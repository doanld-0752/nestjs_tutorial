import { IsEmail, IsString, IsOptional, IsUrl, Matches, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PASSWORD_MIN_LENGTH, USERNAME_MAX_LENGTH, USERNAME_REGEX } from 'src/common/constants/validate-user.constants';
import { IsMatch } from 'src/common/validators/is-match.decorator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class SignupDto {
  @ApiProperty({
    description: 'Email',
    example: 'account@sun-asterisk.com',
    format: 'email'
  })
  @IsNotEmpty({ message: i18nValidationMessage('auth.validation.emailRequired') })
  @IsEmail({}, { message: i18nValidationMessage('auth.validation.emailInvalid') })
  email: string;

  @ApiProperty({
    description: 'Username',
    example: 'username',
    maxLength: USERNAME_MAX_LENGTH,
    pattern: USERNAME_REGEX.source
  })
  @IsString()
  @IsNotEmpty({ message: i18nValidationMessage('auth.validation.usernameRequired') })
  @MaxLength(USERNAME_MAX_LENGTH, { message: i18nValidationMessage('auth.validation.usernameTooLong', { maxLength: USERNAME_MAX_LENGTH }) })
  @Matches(USERNAME_REGEX, { message: i18nValidationMessage('auth.validation.usernameInvalid') })
  username: string;

  @ApiProperty({
    description: 'Password',
    example: 'password@1234',
    minLength: PASSWORD_MIN_LENGTH,
    format: 'password'
  })
  @IsString()
  @MinLength(PASSWORD_MIN_LENGTH, { message: i18nValidationMessage('auth.validation.passwordTooShort', { minLength: PASSWORD_MIN_LENGTH }) })
  password: string;

  @ApiProperty({
    description: 'Password confirmation (must match password)',
    example: 'password@1234',
    minLength: PASSWORD_MIN_LENGTH,
    format: 'password'
  })
  @IsString()
  @MinLength(PASSWORD_MIN_LENGTH, { message: i18nValidationMessage('auth.validation.passwordTooShort', { minLength: PASSWORD_MIN_LENGTH }) })
  @IsMatch('password', { message: i18nValidationMessage('auth.validation.passwordsDoNotMatch') })
  passwordConfirmation: string;

  @ApiPropertyOptional({
    description: 'User bio',
    example: 'example bio',
    type: 'string'
  })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({
    description: 'IMG URL',
    example: 'Https://localhost:3000/images/avatar.png',
    format: 'url'
  })
  @IsOptional()
  @IsUrl({}, { message: i18nValidationMessage('auth.validation.imageUrlInvalid') })
  image?: string;
}
