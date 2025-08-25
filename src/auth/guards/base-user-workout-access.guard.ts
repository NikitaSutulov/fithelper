import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

export type UserWorkoutAccessInfo = { userId: string };

export abstract class BaseUserWorkoutAccessGuard implements CanActivate {
  private readonly ROLE_ADMIN = 'admin';

  abstract getUserWorkoutInfo(
    context: ExecutionContext
  ): Promise<UserWorkoutAccessInfo>;

  isUserWorkoutAvailable(
    userId: string,
    userWorkoutInfo: UserWorkoutAccessInfo
  ): boolean {
    return userWorkoutInfo.userId === userId;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const userRole = req.user?.role;
    if (userRole === this.ROLE_ADMIN) {
      return true;
    }
    const userId = req.user?.sub;
    const userWorkoutInfo = await this.getUserWorkoutInfo(context);
    if (!userWorkoutInfo) {
      throw new NotFoundException('User workout not found');
    }
    if (this.isUserWorkoutAvailable(userId, userWorkoutInfo)) {
      return true;
    }
    throw new ForbiddenException('Access denied');
  }
}
