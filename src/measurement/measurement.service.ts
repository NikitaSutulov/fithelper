import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  MeasurementDto,
  CreateMeasurementDto,
  UpdateMeasurementDto,
} from 'src/measurement/dto';
import { Measurement } from 'src/measurement/entities/measurement.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MeasurementService {
  constructor(
    @InjectRepository(Measurement)
    private readonly measurementsRepo: Repository<Measurement>,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>
  ) {}

  private toDto(measurement: Measurement): MeasurementDto {
    return {
      id: measurement.id,
      userId: measurement.user.id,
      measurementDate: measurement.measurementDate,
      weight: measurement.weight,
    };
  }

  async create(
    createMeasurementDto: CreateMeasurementDto
  ): Promise<MeasurementDto> {
    const user = await this.usersRepo.findOneBy({
      id: createMeasurementDto.userId,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const existingMeasurement = await this.measurementsRepo.findOne({
      where: { user, measurementDate: new Date().toISOString().split('T')[0] },
    });
    if (existingMeasurement) {
      throw new BadRequestException(
        'Measurement for this user for today already exists'
      );
    }
    const newMeasurement = this.measurementsRepo.create({
      user,
      weight: createMeasurementDto.weight,
    });
    return this.toDto(await this.measurementsRepo.save(newMeasurement));
  }

  async findAll(): Promise<MeasurementDto[]> {
    return (
      await this.measurementsRepo.find({
        relations: ['user'],
      })
    ).map(this.toDto);
  }

  async findByUserId(userId: string): Promise<MeasurementDto[]> {
    const user = await this.usersRepo.findOneBy({
      id: userId,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return (
      await this.measurementsRepo.find({
        where: { user },
        relations: ['user'],
      })
    ).map(this.toDto);
  }

  async findById(id: string): Promise<MeasurementDto | null> {
    const measurement = await this.measurementsRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    return measurement ? this.toDto(measurement) : null;
  }

  async update(
    id: string,
    updateMeasurementDto: UpdateMeasurementDto
  ): Promise<MeasurementDto> {
    const measurementToUpdate = await this.measurementsRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!measurementToUpdate) {
      throw new NotFoundException('Measurement not found');
    }
    measurementToUpdate.weight = updateMeasurementDto.weight;
    return this.toDto(await this.measurementsRepo.save(measurementToUpdate));
  }

  async delete(id: string): Promise<MeasurementDto> {
    const measurementToDelete = await this.findById(id);
    if (!measurementToDelete) {
      throw new NotFoundException('Measurement not found');
    }
    await this.measurementsRepo.delete({ id });
    return measurementToDelete;
  }
}
