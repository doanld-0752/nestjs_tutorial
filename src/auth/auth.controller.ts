import { Controller, Post, Body, UseInterceptors, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { HTTP_OK, HTTP_BAD_REQUEST, HTTP_CREATED, HTTP_UNAUTHORIZED } from 'src/common/constants/response.constants';
import { NoCacheInterceptor } from 'src/common/interceptors/no-cache.interceptor';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { LIMIT_REQUEST, TTL_REQUEST } from 'src/common/constants/auth.const';

@ApiTags('auth')
@Controller({
  path: 'auth'
})
@UseInterceptors(NoCacheInterceptor)
@UseGuards(ThrottlerGuard)
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'User registration',
    description: 'Register a new user account and receive an access token'
  })
  @ApiBody({
    type: SignupDto,
    description: 'User registration data',
    examples: {
      example1: {
        summary: 'Complete registration example',
        value: {
          email: 'account@sun-asterisk.com',
          username: 'username',
          password: 'REPLACE_WITH_YOUR_PASSWORD',
          passwordConfirmation: 'REPLACE_WITH_YOUR_PASSWORD',
          bio: 'Software developer',
          image: 'https://example.com/avatar.jpg'
        }
      },
      example2: {
        summary: 'Minimal registration example',
        value: {
          email: 'account@sun-asterisk.com',
          username: 'username',
          password: 'REPLACE_WITH_YOUR_PASSWORD',
          passwordConfirmation: 'REPLACE_WITH_YOUR_PASSWORD',
        }
      }
    }
  })
  @ApiResponse({
    status: HTTP_CREATED,
    description: 'User registered successfully',
    type: AuthResponseDto
  })
  @ApiResponse({
    status: HTTP_BAD_REQUEST,
    description: 'Bad request - validation errors or email already exists'
  })
  @ApiResponse({
    status: HTTP_UNAUTHORIZED,
    description: 'Unauthorized - passwords do not match or email already in use'
  })
  @Post('signup')
  @Throttle({ default: { limit: LIMIT_REQUEST, ttl: TTL_REQUEST } })
  register(@Body() input: SignupDto): Promise<AuthResponseDto> {
    return this.authService.register(input);
  }

  @ApiOperation({
    summary: 'User login',
    description: 'Authenticate user credentials and receive an access token'
  })
  @ApiBody({
    type: LoginDto,
    description: 'User login credentials',
    examples: {
      example1: {
        summary: 'Login example',
        value: {
          email: 'account@sun-asterisk.com',
          password: 'REPLACE_WITH_YOUR_PASSWORD',
        }
      }
    }
  })
  @ApiResponse({
    status: HTTP_OK,
    description: 'Login successful',
    type: AuthResponseDto
  })
  @ApiResponse({
    status: HTTP_BAD_REQUEST,
    description: 'Bad request - validation errors'
  })
  @ApiResponse({
    status: HTTP_UNAUTHORIZED,
    description: 'Unauthorized - invalid credentials'
  })
  @Post('login')
  @Throttle({ default: { limit: LIMIT_REQUEST, ttl: TTL_REQUEST } })
  authenticateUser(@Body() input: LoginDto): Promise<AuthResponseDto> {
    return this.authService.authenticateUser(input);
  }
}
