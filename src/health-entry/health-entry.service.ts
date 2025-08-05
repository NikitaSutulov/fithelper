import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HealthEntry } from './entities/health-entry.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import {
  CreateHealthEntryDto,
  HealthEntryDto,
  UpdateHealthEntryDto,
} from './dto';

@Injectable()
export class HealthEntryService {
  constructor(
    @InjectRepository(HealthEntry)
    private readonly healthEntriesRepo: Repository<HealthEntry>,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>
  ) {}

  private toDto(healthEntry: HealthEntry): HealthEntryDto {
    return {
      id: healthEntry.id,
      userId: healthEntry.user.id,
      entryDate: healthEntry.entryDate,
      stepsCount: healthEntry.stepsCount,
      workoutSessionIds: healthEntry.workoutSessions.map(
        (session) => session.id
      ),
      waterPortionIds: healthEntry.waterPortions.map((portion) => portion.id),
      mealIds: healthEntry.meals.map((meal) => meal.id),
      updatedAt: healthEntry.updatedAt,
    };
  }

  async create(
    createHealthEntryDto: CreateHealthEntryDto
  ): Promise<HealthEntryDto> {
    const user = await this.usersRepo.findOneBy({
      id: createHealthEntryDto.userId,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const existingHealthEntry = await this.healthEntriesRepo.findOne({
      where: { user, entryDate: new Date().toISOString().split('T')[0] },
    });
    if (existingHealthEntry) {
      throw new BadRequestException(
        'Health entry for this user for today already exists'
      );
    }
    const newHealthEntry = this.healthEntriesRepo.create({
      user,
      stepsCount: createHealthEntryDto.stepsCount,
      workoutSessions: [],
      waterPortions: [],
    });
    return this.toDto(await this.healthEntriesRepo.save(newHealthEntry));
  }

  async findAll(): Promise<HealthEntryDto[]> {
    return (
      await this.healthEntriesRepo.find({
        relations: ['user', 'workoutSessions', 'waterPortions', 'meals'],
      })
    ).map(this.toDto);
  }

  async findByUserId(userId: string): Promise<HealthEntryDto[]> {
    const user = await this.usersRepo.findOneBy({
      id: userId,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return (
      await this.healthEntriesRepo.find({
        where: { user },
        relations: ['user', 'workoutSessions', 'waterPortions', 'meals'],
      })
    ).map(this.toDto);
  }

  async findById(id: string): Promise<HealthEntryDto | null> {
    const healthEntry = await this.healthEntriesRepo.findOne({
      where: { id },
      relations: ['user', 'workoutSessions', 'waterPortions', 'meals'],
    });
    return healthEntry ? this.toDto(healthEntry) : null;
  }

  async update(
    id: string,
    updateHealthEntryDto: UpdateHealthEntryDto
  ): Promise<HealthEntryDto> {
    const healthEntryToUpdate = await this.healthEntriesRepo.findOne({
      where: { id },
      relations: ['user', 'workoutSessions', 'waterPortions', 'meals'],
    });
    if (!healthEntryToUpdate) {
      throw new NotFoundException('Health entry not found');
    }
    if (updateHealthEntryDto.stepsCount < healthEntryToUpdate.stepsCount) {
      throw new BadRequestException('Steps count cannot be decreased');
    }
    healthEntryToUpdate.stepsCount = updateHealthEntryDto.stepsCount;
    return this.toDto(await this.healthEntriesRepo.save(healthEntryToUpdate));
  }

  async delete(id: string): Promise<HealthEntryDto> {
    const healthEntryToDelete = await this.findById(id);
    if (!healthEntryToDelete) {
      throw new NotFoundException('Health entry not found');
    }
    await this.healthEntriesRepo.delete({ id });
    return healthEntryToDelete;
  }
}
