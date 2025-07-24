import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardioExerciseConfiguration } from './entities/cardio-exercise-configuration.entity';
import { Repository } from 'typeorm';
import { ExerciseService } from 'src/exercise/exercise.service';
import {
  CreateCardioExerciseConfigurationDto,
  CardioExerciseConfigurationDto,
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

  private toDto(
    cardioExerciseConfiguration: CardioExerciseConfiguration
  ): CardioExerciseConfigurationDto {
    return {
      id: cardioExerciseConfiguration.id,
      exerciseId: cardioExerciseConfiguration.exercise.id,
      workoutId: cardioExerciseConfiguration.workout.id,
      time: cardioExerciseConfiguration.time,
    };
  }

  async create(
    createCardioExerciseConfigurationDto: CreateCardioExerciseConfigurationDto
  ): Promise<CardioExerciseConfigurationDto> {
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
    return this.toDto(
      await this.cardioExerciseConfigurationsRepo.save(
        newCardioExerciseConfiguration
      )
    );
  }

  async findAll(): Promise<CardioExerciseConfigurationDto[]> {
    return (
      await this.cardioExerciseConfigurationsRepo.find({
        relations: ['exercise', 'workout'],
      })
    ).map(this.toDto);
  }

  async findById(id: string): Promise<CardioExerciseConfigurationDto | null> {
    const cardioExerciseConfiguration =
      await this.cardioExerciseConfigurationsRepo.findOne({
        where: { id },
        relations: ['exercise', 'workout'],
      });
    return cardioExerciseConfiguration
      ? this.toDto(cardioExerciseConfiguration)
      : null;
  }

  async update(
    id: string,
    updateCardioExerciseConfigurationDto: UpdateCardioExerciseConfigurationDto
  ): Promise<CardioExerciseConfigurationDto> {
    const cardioExerciseConfigurationToUpdate =
      await this.cardioExerciseConfigurationsRepo.findOne({
        where: { id },
        relations: ['exercise', 'workout'],
      });
    if (!cardioExerciseConfigurationToUpdate) {
      throw new NotFoundException('Cardio exercise configuration not found');
    }
    cardioExerciseConfigurationToUpdate.time =
      updateCardioExerciseConfigurationDto.time;
    return this.toDto(
      await this.cardioExerciseConfigurationsRepo.save(
        cardioExerciseConfigurationToUpdate
      )
    );
  }

  async delete(id: string): Promise<CardioExerciseConfigurationDto> {
    const cardioExerciseConfigurationToDelete = await this.findById(id);
    if (!cardioExerciseConfigurationToDelete) {
      throw new NotFoundException('Cardio exercise configuration not found');
    }
    await this.cardioExerciseConfigurationsRepo.delete({ id });
    return cardioExerciseConfigurationToDelete;
  }
}
