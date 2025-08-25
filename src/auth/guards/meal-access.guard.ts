import { ExecutionContext, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BaseHealthEntryAccessGuard,
  HealthEntryAccessInfo,
} from './base-health-entry-access.guard';
import { Meal } from 'src/meal/entities/meal.entity';

export class MealAccessGuard extends BaseHealthEntryAccessGuard {
  constructor(
    @InjectRepository(Meal)
    private readonly mealsRepo: Repository<Meal>
  ) {
    super();
  }

  override async getHealthEntryInfo(
    context: ExecutionContext
  ): Promise<HealthEntryAccessInfo> {
    const req = context.switchToHttp().getRequest();
    const mealId = req.params.id;
    const meal = await this.mealsRepo.findOne({
      where: { id: mealId },
      relations: ['healthEntry', 'healthEntry.user'],
    });
    if (!meal) {
      throw new NotFoundException('Meal not found');
    }
    const healthEntry = meal.healthEntry;
    return {
      userId: healthEntry.user.id,
    };
  }
}
