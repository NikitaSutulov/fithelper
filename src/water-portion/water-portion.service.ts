import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HealthEntry } from 'src/health-entry/entities/health-entry.entity';
import {
  WaterPortionDto,
  CreateWaterPortionDto,
  UpdateWaterPortionDto,
} from './dto';
import { WaterPortion } from './entities/water-portion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WaterPortionService {
  constructor(
    @InjectRepository(WaterPortion)
    private readonly waterPortionsRepo: Repository<WaterPortion>,
    @InjectRepository(HealthEntry)
    private readonly healthEntriesRepo: Repository<HealthEntry>
  ) {}

  private toDto(waterPortion: WaterPortion): WaterPortionDto {
    return {
      id: waterPortion.id,
      healthEntryId: waterPortion.healthEntry.id,
      amount: waterPortion.amount,
      createdAt: waterPortion.createdAt,
      updatedAt: waterPortion.updatedAt,
    };
  }

  async create(
    createWaterPortionDto: CreateWaterPortionDto
  ): Promise<WaterPortionDto> {
    const healthEntry = await this.healthEntriesRepo.findOneBy({
      id: createWaterPortionDto.healthEntryId,
    });
    if (!healthEntry) {
      throw new NotFoundException('Health entry not found');
    }
    const newWaterPortion = this.waterPortionsRepo.create({
      healthEntry,
      amount: createWaterPortionDto.amount,
    });
    return this.toDto(await this.waterPortionsRepo.save(newWaterPortion));
  }

  async findAll(): Promise<WaterPortionDto[]> {
    return (
      await this.waterPortionsRepo.find({
        relations: ['healthEntry'],
      })
    ).map(this.toDto);
  }

  async findByHealthEntryId(healthEntryId: string): Promise<WaterPortionDto[]> {
    const healthEntry = await this.healthEntriesRepo.findOneBy({
      id: healthEntryId,
    });
    if (!healthEntry) {
      throw new NotFoundException('Health entry not found');
    }
    return (
      await this.waterPortionsRepo.find({
        where: { healthEntry: { id: healthEntry.id } },
        relations: ['healthEntry'],
      })
    ).map(this.toDto);
  }

  async findById(id: string): Promise<WaterPortionDto | null> {
    const waterPortion = await this.waterPortionsRepo.findOne({
      where: { id },
      relations: ['healthEntry'],
    });
    return waterPortion ? this.toDto(waterPortion) : null;
  }

  async update(
    id: string,
    updateWaterPortionDto: UpdateWaterPortionDto
  ): Promise<WaterPortionDto> {
    const waterPortionToUpdate = await this.waterPortionsRepo.findOne({
      where: { id },
      relations: ['healthEntry'],
    });
    if (!waterPortionToUpdate) {
      throw new NotFoundException('Water portion not found');
    }
    waterPortionToUpdate.amount = updateWaterPortionDto.amount;
    return this.toDto(await this.waterPortionsRepo.save(waterPortionToUpdate));
  }

  async delete(id: string): Promise<WaterPortionDto> {
    const waterPortionToDelete = await this.findById(id);
    if (!waterPortionToDelete) {
      throw new NotFoundException('Water portion not found');
    }
    await this.waterPortionsRepo.delete({ id });
    return waterPortionToDelete;
  }
}
