import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';
import { CreateUserDto } from 'src/user/dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('signup')
  @HttpCode(200)
  signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  getMe(@Request() req) {
    return {
      id: req.user.sub,
      username: req.user.username,
    };
  }
}
