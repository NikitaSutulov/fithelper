import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkoutDto, UpdateWorkoutDto, WorkoutDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Workout } from './entities/workout.entity';
import { EntityManager, Repository } from 'typeorm';
import { UserWorkout } from 'src/user-workout/entities/user-workout.entity';
import { User } from 'src/user/entities/user.entity';
import { CardioExerciseConfiguration } from 'src/cardio-exercise-configuration/entities/cardio-exercise-configuration.entity';
import { StrengthExerciseConfiguration } from 'src/strength-exercise-configuration/entities/strength-exercise-configuration.entity';
import { ExerciseSet } from 'src/exercise-set/entities/exercise-set.entity';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(Workout)
    private readonly workoutsRepo: Repository<Workout>
  ) {}

  private toDto(workout: Workout): WorkoutDto {
    return {
      id: workout.id,
      name: workout.name,
      authorId: workout.author?.id ?? null,
      isPublic: workout.isPublic,
      cardioExerciseConfigurationIds: workout.cardioExerciseConfigurations.map(
        (config) => config.id
      ),
      strengthExerciseConfigurationIds:
        workout.strengthExerciseConfigurations.map((config) => config.id),
      createdAt: workout.createdAt,
      updatedAt: workout.updatedAt,
    };
  }

  async create(createWorkoutDto: CreateWorkoutDto): Promise<WorkoutDto> {
    return this.workoutsRepo.manager.transaction(async (entityManager) => {
      const author = await entityManager.findOneBy(User, {
        id: createWorkoutDto.authorId,
      });
      if (!author) {
        throw new NotFoundException('Author not found');
      }
      const { name, isPublic } = createWorkoutDto;
      const newWorkout = entityManager.create(Workout, {
        name,
        author,
        isPublic,
        cardioExerciseConfigurations: [],
        strengthExerciseConfigurations: [],
      });
      const savedWorkout = await entityManager.save(newWorkout);
      const userWorkout = entityManager.create(UserWorkout, {
        user: author,
        workout: savedWorkout,
        isOwner: true,
      });
      await entityManager.save(userWorkout);
      return this.toDto(savedWorkout);
    });
  }

  async copy(
    id: string,
    createWorkoutDto: CreateWorkoutDto
  ): Promise<WorkoutDto> {
    return this.workoutsRepo.manager.transaction(async (entityManager) => {
      const originalWorkout = await entityManager.findOne(Workout, {
        where: { id },
        relations: [
          'author',
          'cardioExerciseConfigurations',
          'cardioExerciseConfigurations.workout',
          'cardioExerciseConfigurations.exercise',
          'strengthExerciseConfigurations',
          'strengthExerciseConfigurations.workout',
          'strengthExerciseConfigurations.exercise',
          'strengthExerciseConfigurations.sets',
        ],
      });
      if (!originalWorkout) {
        throw new NotFoundException('Workout not found');
      }
      const savedWorkoutCopy = await this.copyWorkoutWithConfigurations(
        entityManager,
        originalWorkout,
        createWorkoutDto
      );
      return this.toDto(savedWorkoutCopy);
    });
  }

  private async copyWorkoutWithConfigurations(
    entityManager: EntityManager,
    originalWorkout: Workout,
    createWorkoutDto: CreateWorkoutDto
  ): Promise<Workout> {
    const copyAuthor = await entityManager.findOneBy(User, {
      id: createWorkoutDto.authorId,
    });
    if (!copyAuthor) {
      throw new NotFoundException('User to be the copy author not found');
    }
    const workoutCopy = entityManager.create(Workout, {
      name: createWorkoutDto.name,
      author: copyAuthor,
      isPublic: createWorkoutDto.isPublic,
      cardioExerciseConfigurations: [],
      strengthExerciseConfigurations: [],
    });
    const savedWorkoutCopy = await entityManager.save(workoutCopy);
    const copiedCardioExerciseConfigurations =
      await this.copyCardioExerciseConfigurations(
        entityManager,
        savedWorkoutCopy,
        originalWorkout.cardioExerciseConfigurations
      );
    const copiedStrengthExerciseConfigurations =
      await this.copyStrengthExerciseConfigurations(
        entityManager,
        savedWorkoutCopy,
        originalWorkout.strengthExerciseConfigurations
      );
    savedWorkoutCopy.cardioExerciseConfigurations =
      copiedCardioExerciseConfigurations;
    savedWorkoutCopy.strengthExerciseConfigurations =
      copiedStrengthExerciseConfigurations;
    const userWorkout = entityManager.create(UserWorkout, {
      user: copyAuthor,
      workout: savedWorkoutCopy,
      isOwner: true,
    });
    await entityManager.save(userWorkout);
    return savedWorkoutCopy;
  }

  private async copyCardioExerciseConfigurations(
    entityManager: EntityManager,
    workoutCopy: Workout,
    cardioExerciseConfigurations: CardioExerciseConfiguration[]
  ): Promise<CardioExerciseConfiguration[]> {
    const copiedCardioExerciseConfigurations = cardioExerciseConfigurations.map(
      (config) =>
        entityManager.create(CardioExerciseConfiguration, {
          exercise: config.exercise,
          workout: workoutCopy,
          time: config.time,
        })
    );
    return await entityManager.save(copiedCardioExerciseConfigurations);
  }

  private async copyStrengthExerciseConfigurations(
    entityManager: EntityManager,
    workoutCopy: Workout,
    strengthExerciseConfigurations: StrengthExerciseConfiguration[]
  ): Promise<StrengthExerciseConfiguration[]> {
    const copiedStrengthExerciseConfigurations =
      strengthExerciseConfigurations.map((config) =>
        entityManager.create(StrengthExerciseConfiguration, {
          exercise: config.exercise,
          workout: workoutCopy,
        })
      );
    const savedStrengthExerciseConfigurations = await entityManager.save(
      copiedStrengthExerciseConfigurations
    );
    const allCopiedExerciseSets: ExerciseSet[] = [];
    for (let i = 0; i < savedStrengthExerciseConfigurations.length; i++) {
      const setsCopy = strengthExerciseConfigurations[i].sets.map((set) =>
        entityManager.create(ExerciseSet, {
          strengthExerciseConfiguration: savedStrengthExerciseConfigurations[i],
          weight: set.weight,
          reps: set.reps,
        })
      );
      savedStrengthExerciseConfigurations[i].sets = setsCopy;
      allCopiedExerciseSets.push(...setsCopy);
    }
    await entityManager.save(allCopiedExerciseSets);
    return savedStrengthExerciseConfigurations;
  }

  async findAll(): Promise<WorkoutDto[]> {
    return (
      await this.workoutsRepo.find({
        relations: [
          'author',
          'cardioExerciseConfigurations',
          'strengthExerciseConfigurations',
        ],
      })
    ).map(this.toDto);
  }

  async findById(id: string): Promise<WorkoutDto | null> {
    const workout = await this.workoutsRepo.findOne({
      where: { id },
      relations: [
        'author',
        'cardioExerciseConfigurations',
        'strengthExerciseConfigurations',
      ],
    });
    return workout ? this.toDto(workout) : null;
  }

  async update(
    id: string,
    updateWorkoutDto: UpdateWorkoutDto
  ): Promise<WorkoutDto> {
    const workoutToUpdate = await this.workoutsRepo.findOne({
      where: { id },
      relations: [
        'author',
        'cardioExerciseConfigurations',
        'strengthExerciseConfigurations',
      ],
    });
    if (!workoutToUpdate) {
      throw new NotFoundException('Workout not found');
    }
    const updatedWorkout = Object.assign(workoutToUpdate, updateWorkoutDto);
    return this.toDto(await this.workoutsRepo.save(updatedWorkout));
  }

  async delete(id: string): Promise<WorkoutDto> {
    const workoutToDelete = await this.findById(id);
    if (!workoutToDelete) {
      throw new NotFoundException('Workout not found');
    }
    await this.workoutsRepo.delete({ id });
    return workoutToDelete;
  }
}
