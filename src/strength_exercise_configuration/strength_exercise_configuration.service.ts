import { Injectable, NotFoundException } from '@nestjs/common';
import { StrengthExerciseConfiguration } from './entities/strength_exercise_configuration.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateStrengthExerciseConfigurationDto,
  UpdateStrengthExerciseConfigurationDto,
} from './dto';
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
      relations: ['exercise'],
    });
  }

  async findById(id: string): Promise<StrengthExerciseConfiguration | null> {
    return this.strengthExerciseConfigurationsRepo.findOne({
      where: { id },
      relations: ['exercise'],
    });
  }

  async update(
    id: string,
    updateStrengthExerciseConfigurationDto: UpdateStrengthExerciseConfigurationDto
  ): Promise<StrengthExerciseConfiguration> {
    const strengthExerciseConfigurationToUpdate = await this.findById(id);
    if (!strengthExerciseConfigurationToUpdate) {
      throw new NotFoundException('Strength exercise configuration not found');
    }
    if (!updateStrengthExerciseConfigurationDto.exerciseId) {
      return strengthExerciseConfigurationToUpdate;
    }
    const exercise = await this.exerciseService.findById(
      updateStrengthExerciseConfigurationDto.exerciseId
    );
    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }
    const updatedStrengthExerciseConfiguration = Object.assign(
      strengthExerciseConfigurationToUpdate,
      { exercise }
    );
    return this.strengthExerciseConfigurationsRepo.save(
      updatedStrengthExerciseConfiguration
    );
  }

  async delete(id: string) {
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
