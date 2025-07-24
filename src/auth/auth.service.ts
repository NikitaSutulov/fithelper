import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto, LoginResponseDto } from './dto';
import { compare } from 'bcrypt';
import { CreateUserDto } from 'src/user/dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    const { username, password } = dto;
    const user = await this.usersRepo.findOneBy({ username });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new BadRequestException('Wrong credentials');
    }
    const payload = { sub: user.id, username: user.username };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async signup(dto: CreateUserDto) {
    return this.userService.create(dto);
  }
}
