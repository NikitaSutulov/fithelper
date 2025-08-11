import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutSession } from './entities/workout-session.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateWorkoutSessionDto, WorkoutSessionDto } from './dto';
import { UserWorkout } from 'src/user-workout/entities/user-workout.entity';
import { HealthEntry } from 'src/health-entry/entities/health-entry.entity';
import { CardioExerciseCompletion } from 'src/cardio-exercise-completion/entities/cardio-exercise-completion.entity';
import { StrengthExerciseCompletion } from 'src/strength-exercise-completion/entities/strength-exercise-completion.entity';
import { CardioExerciseConfiguration } from 'src/cardio-exercise-configuration/entities/cardio-exercise-configuration.entity';
import { StrengthExerciseConfiguration } from 'src/strength-exercise-configuration/entities/strength-exercise-configuration.entity';

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
    return this.workoutSessionsRepo.manager.transaction(
      async (entityManager) => {
        const userWorkout = await entityManager.findOne(UserWorkout, {
          where: {
            id: createWorkoutSessionDto.userWorkoutId,
          },
          relations: [
            'workout',
            'workout.cardioExerciseConfigurations',
            'workout.strengthExerciseConfigurations',
          ],
        });
        if (!userWorkout) {
          throw new NotFoundException('User workout not found');
        }
        const healthEntry = await entityManager.findOneBy(HealthEntry, {
          id: createWorkoutSessionDto.healthEntryId,
        });
        if (!healthEntry) {
          throw new NotFoundException('Health entry not found');
        }
        const newWorkoutSession = entityManager.create(WorkoutSession, {
          userWorkout,
          healthEntry,
          strengthExerciseCompletions: [],
          cardioExerciseCompletions: [],
        });
        const cardioExerciseConfigurations =
          userWorkout.workout.cardioExerciseConfigurations;
        const strengthExerciseConfigurations =
          userWorkout.workout.strengthExerciseConfigurations;
        const savedWorkoutSession = await this.createCompletionsAndSave(
          entityManager,
          cardioExerciseConfigurations,
          strengthExerciseConfigurations,
          newWorkoutSession
        );
        return this.toDto(savedWorkoutSession);
      }
    );
  }

  private async createCompletionsAndSave(
    entityManager: EntityManager,
    cardioExerciseConfigurations: CardioExerciseConfiguration[],
    strengthExerciseConfigurations: StrengthExerciseConfiguration[],
    workoutSession: WorkoutSession
  ): Promise<WorkoutSession> {
    const cardioExerciseCompletions =
      await this.createCardioExerciseCompletions(
        entityManager,
        cardioExerciseConfigurations,
        workoutSession
      );
    const strengthExerciseCompletions =
      await this.createStrengthExerciseCompletions(
        entityManager,
        strengthExerciseConfigurations,
        workoutSession
      );
    workoutSession.cardioExerciseCompletions = cardioExerciseCompletions;
    workoutSession.strengthExerciseCompletions = strengthExerciseCompletions;
    return await entityManager.save(workoutSession);
  }

  private async createCardioExerciseCompletions(
    entityManager: EntityManager,
    cardioExerciseConfigurations: CardioExerciseConfiguration[],
    workoutSession: WorkoutSession
  ): Promise<CardioExerciseCompletion[]> {
    const cardioCompletions = cardioExerciseConfigurations.map((config) =>
      entityManager.create(CardioExerciseCompletion, {
        cardioExerciseConfiguration: config,
        workoutSession,
        isCompleted: false,
      })
    );
    return await entityManager.save(cardioCompletions);
  }

  private async createStrengthExerciseCompletions(
    entityManager: EntityManager,
    strengthExerciseConfigurations: StrengthExerciseConfiguration[],
    workoutSession: WorkoutSession
  ): Promise<StrengthExerciseCompletion[]> {
    const strengthCompletions = strengthExerciseConfigurations.map((config) =>
      entityManager.create(StrengthExerciseCompletion, {
        strengthExerciseConfiguration: config,
        workoutSession,
        isCompleted: false,
      })
    );
    return await entityManager.save(strengthCompletions);
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
        where: { userWorkout: { id: userWorkout.id } },
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
        where: { healthEntry: { id: healthEntry.id } },
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
