import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutSession } from './entities/workout-session.entity';
import { Repository } from 'typeorm';
import { CreateWorkoutSessionDto, WorkoutSessionDto } from './dto';
import { UserWorkout } from 'src/user-workout/entities/user-workout.entity';

@Injectable()
export class WorkoutSessionService {
  constructor(
    @InjectRepository(WorkoutSession)
    private readonly workoutSessionsRepo: Repository<WorkoutSession>,
    @InjectRepository(UserWorkout)
    private readonly userWorkoutsRepo: Repository<UserWorkout>
  ) {}

  private toDto(workoutSession: WorkoutSession): WorkoutSessionDto {
    return {
      id: workoutSession.id,
      userWorkoutId: workoutSession.userWorkout.id,
      strengthExerciseConfigurationIds:
        workoutSession.strengthExerciseCompletions.map(
          (completion) => completion.id
        ),
      cardioExerciseConfigurationIds:
        workoutSession.cardioExerciseCompletions.map(
          (completion) => completion.id
        ),
    };
  }

  async create(
    createWorkoutSessionDto: CreateWorkoutSessionDto
  ): Promise<WorkoutSessionDto> {
    const userWorkout = await this.userWorkoutsRepo.findOneBy({
      id: createWorkoutSessionDto.userWorkoutId,
    });
    if (!userWorkout) {
      throw new NotFoundException('User workout not found');
    }
    const newWorkoutSession = this.workoutSessionsRepo.create({
      userWorkout,
    });
    return this.toDto(await this.workoutSessionsRepo.save(newWorkoutSession));
  }

  async findAll(): Promise<WorkoutSessionDto[]> {
    return (
      await this.workoutSessionsRepo.find({
        relations: [
          'userWorkout',
          'strengthExerciseCompletions',
          'cardioExerciseCompletions',
        ],
      })
    ).map(this.toDto);
  }

  async findByUserWorkoutId(
    userWorkoutId: string
  ): Promise<WorkoutSessionDto[]> {
    const userWorkout = await this.userWorkoutsRepo.findOneBy({
      id: userWorkoutId,
    });
    if (!userWorkout) {
      throw new NotFoundException('User workout not found');
    }
    return (
      await this.workoutSessionsRepo.find({
        where: { userWorkout },
        relations: [
          'userWorkout',
          'strengthExerciseCompletions',
          'cardioExerciseCompletions',
        ],
      })
    ).map(this.toDto);
  }

  async findById(id: string): Promise<WorkoutSessionDto | null> {
    const workoutSession = await this.workoutSessionsRepo.findOne({
      where: { id },
      relations: [
        'userWorkout',
        'strengthExerciseCompletions',
        'cardioExerciseCompletions',
      ],
    });
    return workoutSession ? this.toDto(workoutSession) : null;
  }

  async delete(id: string): Promise<WorkoutSessionDto> {
    const workoutSessionToDelete = await this.findById(id);
    if (!workoutSessionToDelete) {
      throw new NotFoundException('Workout session not found');
    }
    await this.workoutSessionsRepo.delete({ id });
    return workoutSessionToDelete;
  }
}
