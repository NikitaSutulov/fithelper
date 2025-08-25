import { ExecutionContext, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HealthEntry } from 'src/health-entry/entities/health-entry.entity';
import { Repository } from 'typeorm';
import {
  BaseHealthEntryAccessGuard,
  HealthEntryAccessInfo,
} from './base-health-entry-access.guard';

export class HealthEntryAccessGuard extends BaseHealthEntryAccessGuard {
  constructor(
    @InjectRepository(HealthEntry)
    private readonly healthEntriesRepo: Repository<HealthEntry>
  ) {
    super();
  }

  override async getHealthEntryInfo(
    context: ExecutionContext
  ): Promise<HealthEntryAccessInfo> {
    const req = context.switchToHttp().getRequest();
    const healthEntryId = req.params.id;
    const healthEntry = await this.healthEntriesRepo.findOne({
      where: { id: healthEntryId },
      relations: ['user'],
    });
    if (!healthEntry) {
      throw new NotFoundException('Health entry not found');
    }
    return {
      userId: healthEntry.user.id,
    };
  }
}
