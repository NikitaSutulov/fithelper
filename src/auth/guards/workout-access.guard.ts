import {
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  BaseWorkoutAccessGuard,
  WorkoutAccessInfo,
} from './base-workout-access.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Workout } from 'src/workout/entities/workout.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkoutAccessGuard extends BaseWorkoutAccessGuard {
  constructor(
    @InjectRepository(Workout)
    private readonly workoutsRepo: Repository<Workout>
  ) {
    super();
  }

  async getWorkoutInfo(context: ExecutionContext): Promise<WorkoutAccessInfo> {
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
