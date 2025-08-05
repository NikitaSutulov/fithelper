import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto, UserDto } from './dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>
  ) {}

  private toDto(user: User): UserDto {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      birthdate: user.birthdate,
      gender: user.gender,
      height: user.height,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    await this.ensureUsernameAndEmailAvailable(
      createUserDto.username,
      createUserDto.email
    );
    const newUser = this.usersRepo.create(createUserDto);
    newUser.password = await this.hashPassword(newUser.password);
    return this.toDto(await this.usersRepo.save(newUser));
  }

  async findById(id: string): Promise<UserDto | null> {
    const user = await this.usersRepo.findOneBy({ id });
    return user ? this.toDto(user) : null;
  }

  async findByUsername(username: string): Promise<UserDto | null> {
    const user = await this.usersRepo.findOneBy({ username });
    return user ? this.toDto(user) : null;
  }

  async findByEmail(email: string): Promise<UserDto | null> {
    const user = await this.usersRepo.findOneBy({ email });
    return user ? this.toDto(user) : null;
  }

  async findAll(): Promise<UserDto[]> {
    return (await this.usersRepo.find()).map(this.toDto);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const userToEdit = await this.usersRepo.findOneBy({ id });
    if (!userToEdit) {
      throw new NotFoundException('User not found');
    }
    if (updateUserDto.username) {
      await this.ensureUsernameAvailable(updateUserDto.username, id);
    }
    if (updateUserDto.email) {
      await this.ensureEmailAvailable(updateUserDto.email, id);
    }
    const updatedUser = Object.assign(userToEdit, updateUserDto);
    updatedUser.password = await this.hashPassword(updatedUser.password);
    return this.toDto(await this.usersRepo.save(updatedUser));
  }

  async delete(id: string): Promise<UserDto> {
    const userToDelete = await this.findById(id);
    if (!userToDelete) {
      throw new NotFoundException('User not found');
    }
    await this.usersRepo.delete({ id });
    return userToDelete;
  }

  private async ensureUsernameAndEmailAvailable(
    username: string,
    email: string,
    userId?: string
  ): Promise<void> {
    await this.ensureUsernameAvailable(username, userId);
    await this.ensureEmailAvailable(email, userId);
  }

  private async ensureUsernameAvailable(
    username: string,
    userId?: string
  ): Promise<void> {
    const userWithTheSameUsername = await this.findByUsername(username);
    if (userWithTheSameUsername && userWithTheSameUsername.id !== userId) {
      throw new BadRequestException(
        'Another user with the same username already exists'
      );
    }
  }

  private async ensureEmailAvailable(
    email: string,
    userId?: string
  ): Promise<void> {
    const userWithTheSameEmail = await this.findByEmail(email);
    if (userWithTheSameEmail && userWithTheSameEmail.id !== userId) {
      throw new BadRequestException(
        'Another user with the same email already exists'
      );
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }
}
