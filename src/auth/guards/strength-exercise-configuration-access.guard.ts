import { ExecutionContext, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BaseWorkoutAccessGuard,
  WorkoutAccessInfo,
} from './base-workout-access.guard';
import { StrengthExerciseConfiguration } from 'src/strength-exercise-configuration/entities/strength-exercise-configuration.entity';

export class StrengthExerciseConfigurationAccessGuard extends BaseWorkoutAccessGuard {
  constructor(
    @InjectRepository(StrengthExerciseConfiguration)
    private readonly strengthExerciseConfigurationsRepo: Repository<StrengthExerciseConfiguration>
  ) {
    super();
  }

  async getWorkoutInfo(context: ExecutionContext): Promise<WorkoutAccessInfo> {
    const req = context.switchToHttp().getRequest();
    const strengthExerciseConfigurationId = req.params.id;
    const strengthExerciseConfiguration =
      await this.strengthExerciseConfigurationsRepo.findOne({
        where: { id: strengthExerciseConfigurationId },
        relations: ['workout', 'workout.author'],
      });
    if (!strengthExerciseConfiguration) {
      throw new NotFoundException('Strength exercise configuration not found');
    }
    const workout = strengthExerciseConfiguration.workout;
    return {
      authorId: workout.author?.id!,
      isPublic: workout.isPublic,
    };
  }
}
