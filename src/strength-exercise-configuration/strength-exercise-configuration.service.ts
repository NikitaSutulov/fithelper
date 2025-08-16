import { Injectable, NotFoundException } from '@nestjs/common';
import { StrengthExerciseConfiguration } from './entities/strength-exercise-configuration.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateStrengthExerciseConfigurationDto,
  StrengthExerciseConfigurationDto,
} from './dto';
import { ExerciseService } from 'src/exercise/exercise.service';
import { WorkoutService } from 'src/workout/workout.service';

@Injectable()
export class StrengthExerciseConfigurationService {
  constructor(
    @InjectRepository(StrengthExerciseConfiguration)
    private readonly strengthExerciseConfigurationsRepo: Repository<StrengthExerciseConfiguration>,
    private readonly exerciseService: ExerciseService,
    private readonly workoutService: WorkoutService
  ) {}

  private toDto(
    strengthExerciseConfiguration: StrengthExerciseConfiguration
  ): StrengthExerciseConfigurationDto {
    return {
      id: strengthExerciseConfiguration.id,
      exerciseId: strengthExerciseConfiguration.exercise.id,
      workoutId: strengthExerciseConfiguration.workout.id,
      exerciseSetIds: strengthExerciseConfiguration.sets.map((set) => set.id),
      createdAt: strengthExerciseConfiguration.createdAt,
    };
  }

  async create(
    createStrengthExerciseConfigurationDto: CreateStrengthExerciseConfigurationDto
  ): Promise<StrengthExerciseConfigurationDto> {
    const exercise = await this.exerciseService.findById(
      createStrengthExerciseConfigurationDto.exerciseId
    );
    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }
    const workout = await this.workoutService.findById(
      createStrengthExerciseConfigurationDto.workoutId
    );
    if (!workout) {
      throw new NotFoundException('Workout not found');
    }
    const newStrengthExerciseConfiguration =
      this.strengthExerciseConfigurationsRepo.create({
        exercise,
        workout,
        sets: [],
      });
    return this.toDto(
      await this.strengthExerciseConfigurationsRepo.save(
        newStrengthExerciseConfiguration
      )
    );
  }

  async findAll(): Promise<StrengthExerciseConfigurationDto[]> {
    return (
      await this.strengthExerciseConfigurationsRepo.find({
        relations: ['exercise', 'sets', 'workout'],
      })
    ).map(this.toDto);
  }

  async findById(id: string): Promise<StrengthExerciseConfigurationDto | null> {
    const strengthExerciseConfiguration =
      await this.strengthExerciseConfigurationsRepo.findOne({
        where: { id },
        relations: ['exercise', 'sets', 'workout'],
      });
    return strengthExerciseConfiguration
      ? this.toDto(strengthExerciseConfiguration)
      : null;
  }

  async delete(id: string): Promise<StrengthExerciseConfigurationDto> {
    const strengthExerciseConfigurationToDelete = await this.findById(id);
    if (!strengthExerciseConfigurationToDelete) {
      throw new NotFoundException('Strength exercise configuration not found');
    }
    await this.strengthExerciseConfigurationsRepo.delete({ id });
    return strengthExerciseConfigurationToDelete;
  }
}
