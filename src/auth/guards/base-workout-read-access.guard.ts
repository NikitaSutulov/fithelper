import {
  BaseWorkoutAccessGuard,
  WorkoutAccessInfo,
} from './base-workout-access.guard';

export abstract class BaseWorkoutReadAccessGuard extends BaseWorkoutAccessGuard {
  override isWorkoutAvailable(
    userId: string,
    workoutInfo: WorkoutAccessInfo
  ): boolean {
    return workoutInfo.isPublic || workoutInfo.authorId === userId;
  }
}
