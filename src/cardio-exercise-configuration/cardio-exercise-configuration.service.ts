import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardioExerciseConfiguration } from './entities/cardio-exercise-configuration.entity';
import { Repository } from 'typeorm';
import { ExerciseService } from 'src/exercise/exercise.service';
import {
  CreateCardioExerciseConfigurationDto,
  UpdateCardioExerciseConfigurationDto,
} from './dto';

@Injectable()
export class CardioExerciseConfigurationService {
  constructor(
    @InjectRepository(CardioExerciseConfiguration)
    private readonly cardioExerciseConfigurationsRepo: Repository<CardioExerciseConfiguration>,
    private readonly exerciseService: ExerciseService
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
    const time = createCardioExerciseConfigurationDto.time;
    const newCardioExerciseConfiguration =
      this.cardioExerciseConfigurationsRepo.create({ exercise, time });
    return this.cardioExerciseConfigurationsRepo.save(
      newCardioExerciseConfiguration
    );
  }

  async findAll(): Promise<CardioExerciseConfiguration[]> {
    return this.cardioExerciseConfigurationsRepo.find({
      relations: ['exercise'],
    });
  }

  async findById(id: string): Promise<CardioExerciseConfiguration | null> {
    return this.cardioExerciseConfigurationsRepo.findOne({
      where: { id },
      relations: ['exercise'],
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
    if (!updateCardioExerciseConfigurationDto.exerciseId) {
      return cardioExerciseConfigurationToUpdate;
    }
    const exercise = await this.exerciseService.findById(
      updateCardioExerciseConfigurationDto.exerciseId
    );
    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }
    const time = updateCardioExerciseConfigurationDto.time;
    const updatedCardioExerciseConfiguration = Object.assign(
      cardioExerciseConfigurationToUpdate,
      { exercise, time }
    );
    return this.cardioExerciseConfigurationsRepo.save(
      updatedCardioExerciseConfiguration
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
