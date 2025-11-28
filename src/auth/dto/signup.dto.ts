import { IsEmail, IsString, IsOptional, IsUrl, Matches, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PASSWORD_MIN_LENGTH, USERNAME_MAX_LENGTH, USERNAME_REGEX } from 'src/common/constants/validate-user.constants';
import { IsMatch } from 'src/common/validators/is-match.decorator';

export class SignupDto {
  @ApiProperty({
    description: 'Email',
    example: 'account@sun-asterisk.com',
    format: 'email'
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({message: 'Email is required',})
  email: string;

  @ApiProperty({
    description: 'Username',
    example: 'username',
    maxLength: USERNAME_MAX_LENGTH,
    pattern: USERNAME_REGEX.source
  })
  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  @MaxLength(USERNAME_MAX_LENGTH, { message: 'Username must be at most 30 characters long' })
  @Matches(USERNAME_REGEX, { message: 'Username can only contain letters, numbers, and underscores' })
  username: string;

  @ApiProperty({
    description: 'Password',
    example: 'password@1234',
    minLength: PASSWORD_MIN_LENGTH,
    format: 'password'
  })
  @IsString()
  @MinLength(PASSWORD_MIN_LENGTH, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiProperty({
    description: 'Password confirmation (must match password)',
    example: 'password@1234',
    minLength: PASSWORD_MIN_LENGTH,
    format: 'password'
  })
  @IsString()
  @MinLength(PASSWORD_MIN_LENGTH, { message: 'Password confirmation must be at least 6 characters long' })
  @IsMatch('password', { message: 'Password confirmation must match password' })
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
  @IsUrl({}, { message: 'Please provide a valid image URL' })
  image?: string;
}
