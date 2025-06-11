import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMuscleDto, UpdateMuscleDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Muscle } from './entities/muscle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MuscleService {
  constructor(
    @InjectRepository(Muscle)
    private readonly musclesRepo: Repository<Muscle>
  ) {}

  async create(createMuscleDto: CreateMuscleDto): Promise<Muscle> {
    const newMuscle = this.musclesRepo.create(createMuscleDto);
    return this.musclesRepo.save(newMuscle);
  }

  async findAll(): Promise<Muscle[]> {
    return this.musclesRepo.find();
  }

  async findById(id: string): Promise<Muscle | null> {
    return this.musclesRepo.findOneBy({ id });
  }

  async update(id: string, updateMuscleDto: UpdateMuscleDto): Promise<Muscle> {
    const muscleToUpdate = await this.findById(id);
    if (!muscleToUpdate) {
      throw new NotFoundException('Muscle not found');
    }
    const updatedMuscle = Object.assign(muscleToUpdate, updateMuscleDto);
    return this.musclesRepo.save(updatedMuscle);
  }

  async delete(id: string) {
    const muscleToDelete = await this.findById(id);
    if (!muscleToDelete) {
      throw new NotFoundException('Muscle not found');
    }
    await this.musclesRepo.delete(muscleToDelete);
    return muscleToDelete;
  }
}
