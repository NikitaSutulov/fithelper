import { ExecutionContext, NotFoundException } from '@nestjs/common';
import {
  BaseUserWorkoutAccessGuard,
  UserWorkoutAccessInfo,
} from './base-user-workout-access.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { UserWorkout } from 'src/user-workout/entities/user-workout.entity';
import { Repository } from 'typeorm';

export class UserWorkoutAccessGuard extends BaseUserWorkoutAccessGuard {
  constructor(
    @InjectRepository(UserWorkout)
    private readonly userWorkoutsRepo: Repository<UserWorkout>
  ) {
    super();
  }

  override async getUserWorkoutInfo(
    context: ExecutionContext
  ): Promise<UserWorkoutAccessInfo> {
    const req = context.switchToHttp().getRequest();
    const userWorkoutId = req.params.id;
    const userWorkout = await this.userWorkoutsRepo.findOne({
      where: { id: userWorkoutId },
      relations: ['user'],
    });
    if (!userWorkout) {
      throw new NotFoundException('User workout not found');
    }
    return {
      userId: userWorkout.user.id,
    };
  }
}
