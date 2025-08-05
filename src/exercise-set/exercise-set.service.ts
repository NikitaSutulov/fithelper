import { Injectable, NotFoundException } from '@nestjs/common';
import { ExerciseSet } from './entities/exercise-set.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateExerciseSetDto,
  ExerciseSetDto,
  UpdateExerciseSetDto,
} from './dto';
import { StrengthExerciseConfigurationService } from 'src/strength-exercise-configuration/strength-exercise-configuration.service';

@Injectable()
export class ExerciseSetService {
  constructor(
    @InjectRepository(ExerciseSet)
    private readonly exerciseSetsRepo: Repository<ExerciseSet>,
    private readonly strengthExerciseConfigurationService: StrengthExerciseConfigurationService
  ) {}

  private toDto(exerciseSet: ExerciseSet): ExerciseSetDto {
    return {
      id: exerciseSet.id,
      strengthExerciseConfigurationId:
        exerciseSet.strengthExerciseConfiguration.id,
      weight: exerciseSet.weight,
      reps: exerciseSet.reps,
      createdAt: exerciseSet.createdAt,
      updatedAt: exerciseSet.updatedAt,
    };
  }

  async create(
    createExerciseSetDto: CreateExerciseSetDto
  ): Promise<ExerciseSetDto> {
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
    return this.toDto(await this.exerciseSetsRepo.save(newExerciseSet));
  }

  async findAll(): Promise<ExerciseSetDto[]> {
    return (
      await this.exerciseSetsRepo.find({
        relations: ['strengthExerciseConfiguration'],
      })
    ).map(this.toDto);
  }

  async findById(id: string): Promise<ExerciseSetDto | null> {
    const exerciseSet = await this.exerciseSetsRepo.findOne({
      where: { id },
      relations: ['strengthExerciseConfiguration'],
    });
    return exerciseSet ? this.toDto(exerciseSet) : null;
  }

  async update(
    id: string,
    updateExerciseSetDto: UpdateExerciseSetDto
  ): Promise<ExerciseSetDto> {
    const exerciseSetToUpdate = await this.exerciseSetsRepo.findOne({
      where: { id },
      relations: ['strengthExerciseConfiguration'],
    });
    if (!exerciseSetToUpdate) {
      throw new NotFoundException('Exercise set not found');
    }
    const updatedExerciseSet = Object.assign(
      exerciseSetToUpdate,
      updateExerciseSetDto
    );
    return this.toDto(await this.exerciseSetsRepo.save(updatedExerciseSet));
  }

  async delete(id: string): Promise<ExerciseSetDto> {
    const exerciseSetToDelete = await this.findById(id);
    if (!exerciseSetToDelete) {
      throw new NotFoundException('Exercise set not found');
    }
    await this.exerciseSetsRepo.delete({ id });
    return exerciseSetToDelete;
  }
}
