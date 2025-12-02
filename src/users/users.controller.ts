import { Controller, Get, Req, UseGuards, UseInterceptors, Header } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ResponseDto } from './dto/response.dto';
import { HTTP_OK, HTTP_UNAUTHORIZED } from 'src/common/constants/response.constants';
import { NoCacheInterceptor } from 'src/common/interceptors/no-cache.interceptor';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@ApiTags('users')
@Controller({
  path: 'users'
})
@UseInterceptors(NoCacheInterceptor)
export class UsersController {
  @ApiOperation({
    summary: 'Get current user profile',
    description: 'Returns the profile information of the currently authenticated user'
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: HTTP_OK,
    description: 'User profile retrieved successfully',
    type: ResponseDto
  })
  @ApiResponse({
    status: HTTP_UNAUTHORIZED,
    description: 'Unauthorized - invalid or missing JWT token'
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @Header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  @Header('Pragma', 'no-cache')
  @Header('Expires', '0')
  getProfile(@CurrentUser() user: any): ResponseDto {
    return user;
  }
}
