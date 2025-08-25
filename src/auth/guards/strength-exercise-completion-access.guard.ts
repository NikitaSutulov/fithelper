import { ExecutionContext, NotFoundException } from '@nestjs/common';
import {
  BaseUserWorkoutAccessGuard,
  UserWorkoutAccessInfo,
} from './base-user-workout-access.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StrengthExerciseCompletion } from 'src/strength-exercise-completion/entities/strength-exercise-completion.entity';

export class StrengthExerciseCompletionAccessGuard extends BaseUserWorkoutAccessGuard {
  constructor(
    @InjectRepository(StrengthExerciseCompletion)
    private readonly StrengthExerciseCompletionsRepo: Repository<StrengthExerciseCompletion>
  ) {
    super();
  }

  override async getUserWorkoutInfo(
    context: ExecutionContext
  ): Promise<UserWorkoutAccessInfo> {
    const req = context.switchToHttp().getRequest();
    const strengthExerciseCompletionId = req.params.id;
    const strengthExerciseCompletion =
      await this.StrengthExerciseCompletionsRepo.findOne({
        where: { id: strengthExerciseCompletionId },
        relations: [
          'workoutSession',
          'workoutSession.userWorkout',
          'workoutSession.userWorkout.user',
        ],
      });
    if (!strengthExerciseCompletion) {
      throw new NotFoundException('Strength exercise completion not found');
    }
    const workoutSession = strengthExerciseCompletion.workoutSession;
    const userWorkout = workoutSession.userWorkout;
    return {
      userId: userWorkout.user.id,
    };
  }
}
