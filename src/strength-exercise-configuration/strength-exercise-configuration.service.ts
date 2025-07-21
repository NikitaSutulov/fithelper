import { Injectable, NotFoundException } from '@nestjs/common';
import { StrengthExerciseConfiguration } from './entities/strength-exercise-configuration.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStrengthExerciseConfigurationDto } from './dto';
import { ExerciseService } from 'src/exercise/exercise.service';

@Injectable()
export class StrengthExerciseConfigurationService {
  constructor(
    @InjectRepository(StrengthExerciseConfiguration)
    private readonly strengthExerciseConfigurationsRepo: Repository<StrengthExerciseConfiguration>,
    private readonly exerciseService: ExerciseService
  ) {}

  async create(
    createStrengthExerciseConfigurationDto: CreateStrengthExerciseConfigurationDto
  ): Promise<StrengthExerciseConfiguration> {
    const exercise = await this.exerciseService.findById(
      createStrengthExerciseConfigurationDto.exerciseId
    );
    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }
    const newStrengthExerciseConfiguration =
      this.strengthExerciseConfigurationsRepo.create({ exercise });
    return this.strengthExerciseConfigurationsRepo.save(
      newStrengthExerciseConfiguration
    );
  }

  async findAll(): Promise<StrengthExerciseConfiguration[]> {
    return this.strengthExerciseConfigurationsRepo.find({
      relations: ['exercise', 'sets', 'workout'],
    });
  }

  async findById(id: string): Promise<StrengthExerciseConfiguration | null> {
    return this.strengthExerciseConfigurationsRepo.findOne({
      where: { id },
      relations: ['exercise', 'sets', 'workout'],
    });
  }

  async delete(id: string): Promise<StrengthExerciseConfiguration> {
    const strengthExerciseConfigurationToDelete = await this.findById(id);
    if (!strengthExerciseConfigurationToDelete) {
      throw new NotFoundException('Strength exercise configuration not found');
    }
    await this.strengthExerciseConfigurationsRepo.delete(
      strengthExerciseConfigurationToDelete
    );
    return strengthExerciseConfigurationToDelete;
  }
}
