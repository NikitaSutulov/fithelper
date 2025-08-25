import { ExecutionContext, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BaseHealthEntryAccessGuard,
  HealthEntryAccessInfo,
} from './base-health-entry-access.guard';
import { Portion } from 'src/portion/entities/portion.entity';

export class PortionAccessGuard extends BaseHealthEntryAccessGuard {
  constructor(
    @InjectRepository(Portion)
    private readonly portionsRepo: Repository<Portion>
  ) {
    super();
  }

  override async getHealthEntryInfo(
    context: ExecutionContext
  ): Promise<HealthEntryAccessInfo> {
    const req = context.switchToHttp().getRequest();
    const portionId = req.params.id;
    const portion = await this.portionsRepo.findOne({
      where: { id: portionId },
      relations: ['meal', 'meal.healthEntry', 'meal.healthEntry.user'],
    });
    if (!portion) {
      throw new NotFoundException('Portion not found');
    }
    const meal = portion.meal;
    const healthEntry = meal.healthEntry;
    return {
      userId: healthEntry.user.id,
    };
  }
}
