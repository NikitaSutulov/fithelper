import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

export type MeasurementAccessInfo = { userId: string };

export abstract class BaseMeasurementAccessGuard implements CanActivate {
  private readonly ROLE_ADMIN = 'admin';

  abstract getMeasurementInfo(
    context: ExecutionContext
  ): Promise<MeasurementAccessInfo>;

  isMeasurementAvailable(
    userId: string,
    measurementInfo: MeasurementAccessInfo
  ): boolean {
    return measurementInfo.userId === userId;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const userRole = req.user?.role;
    if (userRole === this.ROLE_ADMIN) {
      return true;
    }
    const userId = req.user?.sub;
    const measurementInfo = await this.getMeasurementInfo(context);
    if (!measurementInfo) {
      throw new NotFoundException('Measurement not found');
    }
    if (this.isMeasurementAvailable(userId, measurementInfo)) {
      return true;
    }
    throw new ForbiddenException('Access denied');
  }
}
