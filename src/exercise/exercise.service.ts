import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  AddMuscleDto,
  CreateExerciseDto,
  ExerciseDto,
  UpdateExerciseDto,
} from './dto';
import { Exercise } from './entities/exercise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MuscleService } from 'src/muscle/muscle.service';
import { MuscleDto } from 'src/muscle/dto';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exercisesRepo: Repository<Exercise>,
    private readonly muscleService: MuscleService
  ) {}

  private toDto(exercise: Exercise): ExerciseDto {
    return {
      id: exercise.id,
      name: exercise.name,
      description: exercise.description,
      muscleIds: exercise.muscles.map((muscle) => muscle.id),
    };
  }

  async create(createExerciseDto: CreateExerciseDto): Promise<ExerciseDto> {
    const newExercise = this.exercisesRepo.create({
      ...createExerciseDto,
      muscles: [],
    });
    return this.toDto(await this.exercisesRepo.save(newExercise));
  }

  async findAll(): Promise<ExerciseDto[]> {
    return (await this.exercisesRepo.find({ relations: ['muscles'] })).map(
      this.toDto
    );
  }

  async findById(id: string): Promise<ExerciseDto | null> {
    const exercise = await this.exercisesRepo.findOne({
      where: { id },
      relations: ['muscles'],
    });
    return exercise ? this.toDto(exercise) : null;
  }

  async update(
    id: string,
    updateExerciseDto: UpdateExerciseDto
  ): Promise<ExerciseDto> {
    const exerciseToUpdate = await this.findById(id);
    if (!exerciseToUpdate) {
      throw new NotFoundException('Exercise not found');
    }
    const updatedExercise = Object.assign(exerciseToUpdate, updateExerciseDto);
    return this.toDto(await this.exercisesRepo.save(updatedExercise));
  }

  async delete(id: string): Promise<ExerciseDto> {
    const exerciseToDelete = await this.findById(id);
    if (!exerciseToDelete) {
      throw new NotFoundException('Exercise not found');
    }
    await this.exercisesRepo.delete(id);
    return exerciseToDelete;
  }

  async getMuscles(id: string): Promise<MuscleDto[]> {
    const exercise = await this.findById(id);
    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }
    return Promise.all(
      exercise.muscleIds.map(
        async (id) => (await this.muscleService.findById(id))!
      )
    );
  }

  async addMuscle(
    id: string,
    addMuscleDto: AddMuscleDto
  ): Promise<ExerciseDto> {
    const exercise = await this.exercisesRepo.findOne({
      where: { id },
      relations: ['muscles'],
    });
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
    return this.toDto(await this.exercisesRepo.save(exercise));
  }

  async deleteMuscle(id: string, muscleId: string): Promise<ExerciseDto> {
    const exercise = await this.exercisesRepo.findOne({
      where: { id },
      relations: ['muscles'],
    });
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
    return this.toDto(await this.exercisesRepo.save(exercise));
  }
}
