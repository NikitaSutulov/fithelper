import {
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { WorkoutAccessInfo } from './base-workout-access.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Workout } from 'src/workout/entities/workout.entity';
import { Repository } from 'typeorm';
import { BaseWorkoutWriteAccessGuard } from './base-workout-write-access.guard';

@Injectable()
export class WorkoutWriteAccessGuard extends BaseWorkoutWriteAccessGuard {
  constructor(
    @InjectRepository(Workout)
    private readonly workoutsRepo: Repository<Workout>
  ) {
    super();
  }

  override async getWorkoutInfo(
    context: ExecutionContext
  ): Promise<WorkoutAccessInfo> {
    const req = context.switchToHttp().getRequest();
    const workoutId = req.params.id;
    const workout = await this.workoutsRepo.findOne({
      where: { id: workoutId },
      relations: ['author'],
    });
    if (!workout) {
      throw new NotFoundException('Workout not found');
    }
    return {
      authorId: workout.author?.id!,
      isPublic: workout.isPublic,
    };
  }
}
