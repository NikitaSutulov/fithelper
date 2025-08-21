import { ExecutionContext, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkoutAccessInfo } from './base-workout-access.guard';
import { CardioExerciseConfiguration } from 'src/cardio-exercise-configuration/entities/cardio-exercise-configuration.entity';
import { BaseWorkoutWriteAccessGuard } from './base-workout-write-access.guard';

export class CardioExerciseConfigurationWriteAccessGuard extends BaseWorkoutWriteAccessGuard {
  constructor(
    @InjectRepository(CardioExerciseConfiguration)
    private readonly cardioExerciseConfigurationsRepo: Repository<CardioExerciseConfiguration>
  ) {
    super();
  }

  async getWorkoutInfo(context: ExecutionContext): Promise<WorkoutAccessInfo> {
    const req = context.switchToHttp().getRequest();
    const cardioExerciseConfigurationId = req.params.id;
    const cardioExerciseConfiguration =
      await this.cardioExerciseConfigurationsRepo.findOne({
        where: { id: cardioExerciseConfigurationId },
        relations: ['workout', 'workout.author'],
      });
    if (!cardioExerciseConfiguration) {
      throw new NotFoundException('Cardio exercise configuration not found');
    }
    const workout = cardioExerciseConfiguration.workout;
    return {
      authorId: workout.author?.id!,
      isPublic: workout.isPublic,
    };
  }
}
