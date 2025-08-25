import { ExecutionContext, NotFoundException } from '@nestjs/common';
import {
  BaseUserWorkoutAccessGuard,
  UserWorkoutAccessInfo,
} from './base-user-workout-access.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardioExerciseCompletion } from 'src/cardio-exercise-completion/entities/cardio-exercise-completion.entity';

export class CardioExerciseCompletionAccessGuard extends BaseUserWorkoutAccessGuard {
  constructor(
    @InjectRepository(CardioExerciseCompletion)
    private readonly CardioExerciseCompletionsRepo: Repository<CardioExerciseCompletion>
  ) {
    super();
  }

  override async getUserWorkoutInfo(
    context: ExecutionContext
  ): Promise<UserWorkoutAccessInfo> {
    const req = context.switchToHttp().getRequest();
    const cardioExerciseCompletionId = req.params.id;
    const cardioExerciseCompletion =
      await this.CardioExerciseCompletionsRepo.findOne({
        where: { id: cardioExerciseCompletionId },
        relations: [
          'workoutSession',
          'workoutSession.userWorkout',
          'workoutSession.userWorkout.user',
        ],
      });
    if (!cardioExerciseCompletion) {
      throw new NotFoundException('Cardio exercise completion not found');
    }
    const workoutSession = cardioExerciseCompletion.workoutSession;
    const userWorkout = workoutSession.userWorkout;
    return {
      userId: userWorkout.user.id,
    };
  }
}
