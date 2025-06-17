import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AddMuscleDto, CreateExerciseDto, UpdateExerciseDto } from './dto';
import { Exercise } from './entities/exercise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Muscle } from 'src/muscle/entities/muscle.entity';
import { MuscleService } from 'src/muscle/muscle.service';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exercisesRepo: Repository<Exercise>,
    private readonly muscleService: MuscleService
  ) {}

  async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    const newExercise = this.exercisesRepo.create(createExerciseDto);
    return this.exercisesRepo.save(newExercise);
  }

  async findAll(): Promise<Exercise[]> {
    return this.exercisesRepo.find({ relations: ['muscles'] });
  }

  async findById(id: string): Promise<Exercise | null> {
    return this.exercisesRepo.findOne({
      where: { id },
      relations: ['muscles'],
    });
  }

  async update(
    id: string,
    updateExerciseDto: UpdateExerciseDto
  ): Promise<Exercise> {
    const exerciseToUpdate = await this.findById(id);
    if (!exerciseToUpdate) {
      throw new NotFoundException('Exercise not found');
    }
    const updatedExercise = Object.assign(exerciseToUpdate, updateExerciseDto);
    return this.exercisesRepo.save(updatedExercise);
  }

  async delete(id: string): Promise<Exercise> {
    const exerciseToDelete = await this.findById(id);
    if (!exerciseToDelete) {
      throw new NotFoundException('Exercise not found');
    }
    await this.exercisesRepo.delete(id);
    return exerciseToDelete;
  }

  async getMuscles(id: string): Promise<Muscle[]> {
    const exercise = await this.findById(id);
    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }
    return exercise.muscles;
  }

  async addMuscle(id: string, addMuscleDto: AddMuscleDto): Promise<Exercise> {
    const exercise = await this.findById(id);
    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }
    const muscle = await this.muscleService.findById(addMuscleDto.muscleId);
    if (!muscle) {
      throw new NotFoundException('Muscle not found');
    }
    if (exercise.muscles.find((m) => m.id === muscle.id)) {
      throw new BadRequestException('Muscle already added for this exercise');
    }
    exercise.muscles.push(muscle);
    return this.exercisesRepo.save(exercise);
  }

  async deleteMuscle(id: string, muscleId: string): Promise<Exercise> {
    const exercise = await this.findById(id);
    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }
    const muscle = await this.muscleService.findById(muscleId);
    if (!muscle) {
      throw new NotFoundException('Muscle not found');
    }
    const muscleIndex = exercise.muscles.findIndex((m) => m.id === muscleId);
    if (muscleIndex === -1) {
      throw new NotFoundException('Muscle not associated with this exercise');
    }
    exercise.muscles.splice(muscleIndex, 1);
    return this.exercisesRepo.save(exercise);
  }
}
