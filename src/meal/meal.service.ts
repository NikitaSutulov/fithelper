import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HealthEntry } from 'src/health-entry/entities/health-entry.entity';
import { MealDto, CreateMealDto, UpdateMealDto } from './dto';
import { Meal } from './entities/meal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MealService {
  constructor(
    @InjectRepository(Meal)
    private readonly mealsRepo: Repository<Meal>,
    @InjectRepository(HealthEntry)
    private readonly healthEntriesRepo: Repository<HealthEntry>
  ) {}

  private toDto(meal: Meal): MealDto {
    return {
      id: meal.id,
      name: meal.name,
      healthEntryId: meal.healthEntry.id,
      portionIds: meal.portions.map((portion) => portion.id),
      createdAt: meal.createdAt,
      updatedAt: meal.updatedAt,
    };
  }

  async create(createMealDto: CreateMealDto): Promise<MealDto> {
    const healthEntry = await this.healthEntriesRepo.findOneBy({
      id: createMealDto.healthEntryId,
    });
    if (!healthEntry) {
      throw new NotFoundException('Health entry not found');
    }
    const newMeal = this.mealsRepo.create({
      name: createMealDto.name,
      healthEntry,
      portions: [],
    });
    return this.toDto(await this.mealsRepo.save(newMeal));
  }

  async findAll(): Promise<MealDto[]> {
    return (
      await this.mealsRepo.find({
        relations: ['healthEntry', 'portions'],
      })
    ).map(this.toDto);
  }

  async findByHealthEntryId(healthEntryId: string): Promise<MealDto[]> {
    const healthEntry = await this.healthEntriesRepo.findOneBy({
      id: healthEntryId,
    });
    if (!healthEntry) {
      throw new NotFoundException('Health entry not found');
    }
    return (
      await this.mealsRepo.find({
        where: { healthEntry },
        relations: ['healthEntry', 'portions'],
      })
    ).map(this.toDto);
  }

  async findById(id: string): Promise<MealDto | null> {
    const meal = await this.mealsRepo.findOne({
      where: { id },
      relations: ['healthEntry', 'portions'],
    });
    return meal ? this.toDto(meal) : null;
  }

  async update(id: string, updateMealDto: UpdateMealDto): Promise<MealDto> {
    const mealToUpdate = await this.mealsRepo.findOne({
      where: { id },
      relations: ['healthEntry', 'portions'],
    });
    if (!mealToUpdate) {
      throw new NotFoundException('Meal not found');
    }
    const updatedMeal = Object.assign(mealToUpdate, updateMealDto);
    return this.toDto(await this.mealsRepo.save(updatedMeal));
  }

  async delete(id: string): Promise<MealDto> {
    const mealToDelete = await this.findById(id);
    if (!mealToDelete) {
      throw new NotFoundException('Meal not found');
    }
    await this.mealsRepo.delete({ id });
    return mealToDelete;
  }
}
