import { ExecutionContext, NotFoundException } from '@nestjs/common';
import {
  BaseUserWorkoutAccessGuard,
  UserWorkoutAccessInfo,
} from './base-user-workout-access.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkoutSession } from 'src/workout-session/entities/workout-session.entity';

export class WorkoutSessionAccessGuard extends BaseUserWorkoutAccessGuard {
  constructor(
    @InjectRepository(WorkoutSession)
    private readonly workoutSessionsRepo: Repository<WorkoutSession>
  ) {
    super();
  }

  override async getUserWorkoutInfo(
    context: ExecutionContext
  ): Promise<UserWorkoutAccessInfo> {
    const req = context.switchToHttp().getRequest();
    const workoutSessionId = req.params.id;
    const workoutSession = await this.workoutSessionsRepo.findOne({
      where: { id: workoutSessionId },
      relations: ['userWorkout', 'userWorkout.user'],
    });
    if (!workoutSession) {
      throw new NotFoundException('Workout session not found');
    }
    const userWorkout = workoutSession.userWorkout;
    return {
      userId: userWorkout.user.id,
    };
  }
}
