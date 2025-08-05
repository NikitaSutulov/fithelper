import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkoutDto, UpdateWorkoutDto, WorkoutDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Workout } from './entities/workout.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(Workout)
    private readonly workoutsRepo: Repository<Workout>,
    private readonly userService: UserService
  ) {}

  private toDto(workout: Workout): WorkoutDto {
    return {
      id: workout.id,
      name: workout.name,
      authorId: workout.author.id,
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
    const author = await this.userService.findById(createWorkoutDto.authorId);
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    const { name, isPublic } = createWorkoutDto;
    const newWorkout = this.workoutsRepo.create({
      name,
      author,
      isPublic,
      cardioExerciseConfigurations: [],
      strengthExerciseConfigurations: [],
    });
    return this.toDto(await this.workoutsRepo.save(newWorkout));
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
