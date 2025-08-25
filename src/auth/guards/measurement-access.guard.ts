import { ExecutionContext, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Measurement } from 'src/measurement/entities/measurement.entity';
import { Repository } from 'typeorm';
import {
  BaseMeasurementAccessGuard,
  MeasurementAccessInfo,
} from './base-measurement-access.guard';

export class MeasurementAccessGuard extends BaseMeasurementAccessGuard {
  constructor(
    @InjectRepository(Measurement)
    private readonly measurementsRepo: Repository<Measurement>
  ) {
    super();
  }

  override async getMeasurementInfo(
    context: ExecutionContext
  ): Promise<MeasurementAccessInfo> {
    const req = context.switchToHttp().getRequest();
    const measurementId = req.params.id;
    const measurement = await this.measurementsRepo.findOne({
      where: { id: measurementId },
      relations: ['user'],
    });
    if (!measurement) {
      throw new NotFoundException('Measurement not found');
    }
    return {
      userId: measurement.user.id,
    };
  }
}
