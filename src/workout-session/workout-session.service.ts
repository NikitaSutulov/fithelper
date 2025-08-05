import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutSession } from './entities/workout-session.entity';
import { Repository } from 'typeorm';
import { CreateWorkoutSessionDto, WorkoutSessionDto } from './dto';
import { UserWorkout } from 'src/user-workout/entities/user-workout.entity';
import { HealthEntry } from 'src/health-entry/entities/health-entry.entity';

@Injectable()
export class WorkoutSessionService {
  constructor(
    @InjectRepository(WorkoutSession)
    private readonly workoutSessionsRepo: Repository<WorkoutSession>,
    @InjectRepository(UserWorkout)
    private readonly userWorkoutsRepo: Repository<UserWorkout>,
    @InjectRepository(HealthEntry)
    private readonly healthEntriesRepo: Repository<HealthEntry>
  ) {}

  private toDto(workoutSession: WorkoutSession): WorkoutSessionDto {
    return {
      id: workoutSession.id,
      userWorkoutId: workoutSession.userWorkout.id,
      healthEntryId: workoutSession.healthEntry.id,
      strengthExerciseCompletionIds:
        workoutSession.strengthExerciseCompletions.map(
          (completion) => completion.id
        ),
      cardioExerciseCompletionIds: workoutSession.cardioExerciseCompletions.map(
        (completion) => completion.id
      ),
      createdAt: workoutSession.createdAt,
      updatedAt: workoutSession.updatedAt,
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
    const healthEntry = await this.healthEntriesRepo.findOneBy({
      id: createWorkoutSessionDto.healthEntryId,
    });
    if (!healthEntry) {
      throw new NotFoundException('Health entry not found');
    }
    const newWorkoutSession = this.workoutSessionsRepo.create({
      userWorkout,
      healthEntry,
      strengthExerciseCompletions: [],
      cardioExerciseCompletions: [],
    });
    return this.toDto(await this.workoutSessionsRepo.save(newWorkoutSession));
  }

  async findAll(): Promise<WorkoutSessionDto[]> {
    return (
      await this.workoutSessionsRepo.find({
        relations: [
          'userWorkout',
          'healthEntry',
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
          'healthEntry',
          'strengthExerciseCompletions',
          'cardioExerciseCompletions',
        ],
      })
    ).map(this.toDto);
  }

  async findByHealthEntryId(
    healthEntryId: string
  ): Promise<WorkoutSessionDto[]> {
    const healthEntry = await this.healthEntriesRepo.findOneBy({
      id: healthEntryId,
    });
    if (!healthEntry) {
      throw new NotFoundException('Health entry not found');
    }
    return (
      await this.workoutSessionsRepo.find({
        where: { healthEntry },
        relations: [
          'userWorkout',
          'healthEntry',
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
        'healthEntry',
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
