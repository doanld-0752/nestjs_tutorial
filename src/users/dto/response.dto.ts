import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResponseDto {
  @ApiProperty({
    description: 'ID',
    example: 1
  })
  id: number;

  @ApiProperty({
    description: 'Email',
    example: 'account@sun-asterisk.com'
  })
  email: string;

  @ApiProperty({
    description: 'Username',
    example: 'username'
  })
  username: string;

  @ApiPropertyOptional({
    description: 'User bio/description',
    example: 'Software developer at Sun*',
    nullable: true
  })
  bio?: string | null;

  @ApiPropertyOptional({
    description: 'IMG URL',
    example: 'https://localhost:3000/images/avatar.jpg',
    nullable: true
  })
  image?: string | null;
}
