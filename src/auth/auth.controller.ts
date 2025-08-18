import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto, UserInfoDto } from './dto';
import { CreateUserDto } from 'src/user/dto';
import { AuthGuard } from './auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Performs user login' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Wrong credentials',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('signup')
  @HttpCode(200)
  @ApiOperation({ summary: 'Performs user signup' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: User,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @Get('me')
  @ApiOperation({ summary: 'Gets info of the authenticated user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: UserInfoDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  getMe(@Request() req) {
    return {
      id: req.user.sub,
      username: req.user.username,
      role: req.user.role,
    };
  }
}
