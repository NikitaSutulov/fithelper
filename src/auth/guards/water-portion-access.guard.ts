import { ExecutionContext, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BaseHealthEntryAccessGuard,
  HealthEntryAccessInfo,
} from './base-health-entry-access.guard';
import { WaterPortion } from 'src/water-portion/entities/water-portion.entity';

export class WaterPortionAccessGuard extends BaseHealthEntryAccessGuard {
  constructor(
    @InjectRepository(WaterPortion)
    private readonly waterPortionsRepo: Repository<WaterPortion>
  ) {
    super();
  }

  override async getHealthEntryInfo(
    context: ExecutionContext
  ): Promise<HealthEntryAccessInfo> {
    const req = context.switchToHttp().getRequest();
    const waterPortionId = req.params.id;
    const waterPortion = await this.waterPortionsRepo.findOne({
      where: { id: waterPortionId },
      relations: ['healthEntry', 'healthEntry.user'],
    });
    if (!waterPortion) {
      throw new NotFoundException('Water portion not found');
    }
    const healthEntry = waterPortion.healthEntry;
    return {
      userId: healthEntry.user.id,
    };
  }
}
