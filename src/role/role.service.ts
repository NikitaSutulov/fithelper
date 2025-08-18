import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { RoleDto } from './dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepo: Repository<Role>
  ) {}

  async findAll(): Promise<RoleDto[]> {
    return this.rolesRepo.find();
  }

  async findById(id: string): Promise<RoleDto | null> {
    return this.rolesRepo.findOneBy({ id });
  }

  async findByName(name: string): Promise<RoleDto | null> {
    return this.rolesRepo.findOneBy({ name });
  }
}
