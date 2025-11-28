import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'jwt_access_token_goes_here'
  })
  access_token: string;
}
