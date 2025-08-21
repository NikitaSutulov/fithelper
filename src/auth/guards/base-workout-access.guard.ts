import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

export type WorkoutAccessInfo = { authorId: string; isPublic: boolean };

export abstract class BaseWorkoutAccessGuard implements CanActivate {
  private readonly ROLE_ADMIN = 'admin';

  abstract getWorkoutInfo(
    context: ExecutionContext
  ): Promise<WorkoutAccessInfo>;

  abstract isWorkoutAvailable(
    userId: string,
    workoutInfo: WorkoutAccessInfo
  ): boolean;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const userRole = req.user?.role;
    if (userRole === this.ROLE_ADMIN) {
      return true;
    }
    const userId = req.user?.sub;
    const workoutInfo = await this.getWorkoutInfo(context);
    if (!workoutInfo) {
      throw new NotFoundException('Workout not found');
    }
    if (this.isWorkoutAvailable(userId, workoutInfo)) {
      return true;
    }
    throw new ForbiddenException('Access denied');
  }
}
