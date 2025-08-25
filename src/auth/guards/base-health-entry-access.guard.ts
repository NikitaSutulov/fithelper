import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

export type HealthEntryAccessInfo = { userId: string };

export abstract class BaseHealthEntryAccessGuard implements CanActivate {
  private readonly ROLE_ADMIN = 'admin';

  abstract getHealthEntryInfo(
    context: ExecutionContext
  ): Promise<HealthEntryAccessInfo>;

  isHealthEntryAvailable(
    userId: string,
    healthEntryInfo: HealthEntryAccessInfo
  ): boolean {
    return healthEntryInfo.userId === userId;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const userRole = req.user?.role;
    if (userRole === this.ROLE_ADMIN) {
      return true;
    }
    const userId = req.user?.sub;
    const healthEntryInfo = await this.getHealthEntryInfo(context);
    if (!healthEntryInfo) {
      throw new NotFoundException('Health entry not found');
    }
    if (this.isHealthEntryAvailable(userId, healthEntryInfo)) {
      return true;
    }
    throw new ForbiddenException('Access denied');
  }
}
