import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { i18nValidationMessage } from 'nestjs-i18n';

export class LoginDto {
  @ApiProperty({
    description: 'Email',
    example: 'account@sun-asterisk.com',
    format: 'email'
  })
  @IsEmail({}, { message: i18nValidationMessage('auth.validation.emailInvalid') })
  email: string;

  @ApiProperty({
    description: 'Password',
    example: 'password@1234',
    format: 'password'
  })
  @IsString()
  password: string;
}
