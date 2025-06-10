import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    await this.ensureUsernameAndEmailAvailable(dto.username, dto.email);
    const newUser = this.usersRepo.create(dto);
    newUser.password = await this.hashPassword(newUser.password);
    return this.usersRepo.save(newUser);
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepo.findOneBy({ id });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepo.findOneBy({ username });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOneBy({ email });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }

  async edit(id: string, dto: UpdateUserDto): Promise<User> {
    const userToEdit = await this.usersRepo.findOneBy({ id });
    if (!userToEdit) {
      throw new NotFoundException('User not found');
    }
    await this.ensureUsernameAndEmailAvailable(dto.username, dto.email, id);
    const updatedUser = Object.assign(userToEdit, dto);
    updatedUser.password = await this.hashPassword(updatedUser.password);
    return this.usersRepo.save(updatedUser);
  }

  async delete(id: string): Promise<User> {
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
    const userWithTheSameUsername = await this.findByUsername(username);
    if (userWithTheSameUsername && userWithTheSameUsername.id !== userId) {
      throw new BadRequestException(
        'Another user with the same username already exists'
      );
    }
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
