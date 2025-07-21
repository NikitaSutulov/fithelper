import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardioExerciseConfiguration } from './entities/cardio-exercise-configuration.entity';
import { Repository } from 'typeorm';
import { ExerciseService } from 'src/exercise/exercise.service';
import {
  CreateCardioExerciseConfigurationDto,
  UpdateCardioExerciseConfigurationDto,
} from './dto';
import { WorkoutService } from 'src/workout/workout.service';

@Injectable()
export class CardioExerciseConfigurationService {
  constructor(
    @InjectRepository(CardioExerciseConfiguration)
    private readonly cardioExerciseConfigurationsRepo: Repository<CardioExerciseConfiguration>,
    private readonly exerciseService: ExerciseService,
    private readonly workoutService: WorkoutService
  ) {}

  async create(
    createCardioExerciseConfigurationDto: CreateCardioExerciseConfigurationDto
  ): Promise<CardioExerciseConfiguration> {
    const exercise = await this.exerciseService.findById(
      createCardioExerciseConfigurationDto.exerciseId
    );
    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }
    const workout = await this.workoutService.findById(
      createCardioExerciseConfigurationDto.workoutId
    );
    if (!workout) {
      throw new NotFoundException('Workout not found');
    }
    const time = createCardioExerciseConfigurationDto.time;
    const newCardioExerciseConfiguration =
      this.cardioExerciseConfigurationsRepo.create({ exercise, workout, time });
    return this.cardioExerciseConfigurationsRepo.save(
      newCardioExerciseConfiguration
    );
  }

  async findAll(): Promise<CardioExerciseConfiguration[]> {
    return this.cardioExerciseConfigurationsRepo.find({
      relations: ['exercise', 'workout'],
    });
  }

  async findById(id: string): Promise<CardioExerciseConfiguration | null> {
    return this.cardioExerciseConfigurationsRepo.findOne({
      where: { id },
      relations: ['exercise', 'workout'],
    });
  }

  async update(
    id: string,
    updateCardioExerciseConfigurationDto: UpdateCardioExerciseConfigurationDto
  ): Promise<CardioExerciseConfiguration> {
    const cardioExerciseConfigurationToUpdate = await this.findById(id);
    if (!cardioExerciseConfigurationToUpdate) {
      throw new NotFoundException('Cardio exercise configuration not found');
    }
    cardioExerciseConfigurationToUpdate.time =
      updateCardioExerciseConfigurationDto.time;
    return this.cardioExerciseConfigurationsRepo.save(
      cardioExerciseConfigurationToUpdate
    );
  }

  async delete(id: string): Promise<CardioExerciseConfiguration> {
    const cardioExerciseConfigurationToDelete = await this.findById(id);
    if (!cardioExerciseConfigurationToDelete) {
      throw new NotFoundException('Cardio exercise configuration not found');
    }
    await this.cardioExerciseConfigurationsRepo.delete(
      cardioExerciseConfigurationToDelete
    );
    return cardioExerciseConfigurationToDelete;
  }
}
