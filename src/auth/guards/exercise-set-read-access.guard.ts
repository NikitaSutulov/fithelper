import { ExecutionContext, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkoutAccessInfo } from './base-workout-access.guard';
import { ExerciseSet } from 'src/exercise-set/entities/exercise-set.entity';
import { BaseWorkoutReadAccessGuard } from './base-workout-read-access.guard';

export class ExerciseSetReadAccessGuard extends BaseWorkoutReadAccessGuard {
  constructor(
    @InjectRepository(ExerciseSet)
    private readonly exerciseSetsRepo: Repository<ExerciseSet>
  ) {
    super();
  }

  async getWorkoutInfo(context: ExecutionContext): Promise<WorkoutAccessInfo> {
    const req = context.switchToHttp().getRequest();
    const exerciseSetId = req.params.id;
    const exerciseSet = await this.exerciseSetsRepo.findOne({
      where: { id: exerciseSetId },
      relations: [
        'strengthExerciseConfiguration.workout',
        'strengthExerciseConfiguration.workout.author',
      ],
    });
    if (!exerciseSet) {
      throw new NotFoundException('Exercise set not found');
    }
    const workout = exerciseSet.strengthExerciseConfiguration.workout;
    return {
      authorId: workout.author?.id!,
      isPublic: workout.isPublic,
    };
  }
}
