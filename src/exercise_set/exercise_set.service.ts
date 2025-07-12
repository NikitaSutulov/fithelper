import { Injectable, NotFoundException } from '@nestjs/common';
import { ExerciseSet } from './entities/exercise_set.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExerciseSetDto, UpdateExerciseSetDto } from './dto';
import { StrengthExerciseConfigurationService } from 'src/strength_exercise_configuration/strength_exercise_configuration.service';

@Injectable()
export class ExerciseSetService {
  constructor(
    @InjectRepository(ExerciseSet)
    private readonly exerciseSetsRepo: Repository<ExerciseSet>,
    private readonly strengthExerciseConfigurationService: StrengthExerciseConfigurationService
  ) {}

  async create(
    createExerciseSetDto: CreateExerciseSetDto
  ): Promise<ExerciseSet> {
    const strengthExerciseConfiguration =
      await this.strengthExerciseConfigurationService.findById(
        createExerciseSetDto.strengthExerciseConfigurationId
      );
    if (!strengthExerciseConfiguration) {
      throw new NotFoundException('Strength exercise configuration not found');
    }
    const { weight, reps } = createExerciseSetDto;
    const newExerciseSet = this.exerciseSetsRepo.create({
      strengthExerciseConfiguration,
      weight,
      reps,
    });
    return this.exerciseSetsRepo.save(newExerciseSet);
  }

  async findAll(): Promise<ExerciseSet[]> {
    return this.exerciseSetsRepo.find({
      relations: [
        'strengthExerciseConfiguration',
        'strengthExerciseConfiguration.exercise',
      ],
    });
  }

  async findById(id: string): Promise<ExerciseSet | null> {
    return this.exerciseSetsRepo.findOne({
      where: { id },
      relations: [
        'strengthExerciseConfiguration',
        'strengthExerciseConfiguration.exercise',
      ],
    });
  }

  async update(
    id: string,
    updateExerciseSetDto: UpdateExerciseSetDto
  ): Promise<ExerciseSet> {
    const exerciseSetToUpdate = await this.findById(id);
    if (!exerciseSetToUpdate) {
      throw new NotFoundException('Exercise set not found');
    }
    if (!updateExerciseSetDto.strengthExerciseConfigurationId) {
      const { weight, reps } = updateExerciseSetDto;
      const updatedExerciseSet = Object.assign(exerciseSetToUpdate, {
        weight,
        reps,
      });
      return this.exerciseSetsRepo.save(updatedExerciseSet);
    }
    const strengthExerciseConfiguration =
      await this.strengthExerciseConfigurationService.findById(
        updateExerciseSetDto.strengthExerciseConfigurationId!
      );
    if (!strengthExerciseConfiguration) {
      throw new NotFoundException('Strength exercise configuration not found');
    }
    const { weight, reps } = updateExerciseSetDto;
    const updatedExerciseSet = Object.assign(exerciseSetToUpdate, {
      strengthExerciseConfiguration,
      weight,
      reps,
    });
    return this.exerciseSetsRepo.save(updatedExerciseSet);
  }

  async delete(id: string) {
    const exerciseSetToDelete = await this.findById(id);
    if (!exerciseSetToDelete) {
      throw new NotFoundException('Exercise set not found');
    }
    await this.exerciseSetsRepo.delete(exerciseSetToDelete);
    return exerciseSetToDelete;
  }
}
