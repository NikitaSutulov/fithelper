import {
  BaseWorkoutAccessGuard,
  WorkoutAccessInfo,
} from './base-workout-access.guard';

export abstract class BaseWorkoutWriteAccessGuard extends BaseWorkoutAccessGuard {
  override isWorkoutAvailable(
    userId: string,
    workoutInfo: WorkoutAccessInfo
  ): boolean {
    return workoutInfo.authorId === userId;
  }
}
