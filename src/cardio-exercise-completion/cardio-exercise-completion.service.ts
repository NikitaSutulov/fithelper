import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CardioExerciseCompletionDto,
  CreateCardioExerciseCompletionDto,
  UpdateCardioExerciseCompletionDto,
} from './dto';
import { CardioExerciseCompletion } from './entities/cardio-exercise-completion.entity';
import { CardioExerciseConfiguration } from 'src/cardio-exercise-configuration/entities/cardio-exercise-configuration.entity';
import { WorkoutSession } from 'src/workout-session/entities/workout-session.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CardioExerciseCompletionService {
  constructor(
    @InjectRepository(CardioExerciseCompletion)
    private readonly cardioExerciseCompletionsRepo: Repository<CardioExerciseCompletion>,
    @InjectRepository(CardioExerciseConfiguration)
    private readonly cardioExerciseConfigurationsRepo: Repository<CardioExerciseConfiguration>,
    @InjectRepository(WorkoutSession)
    private readonly workoutSessionsRepo: Repository<WorkoutSession>
  ) {}

  private toDto(
    cardioExerciseCompletion: CardioExerciseCompletion
  ): CardioExerciseCompletionDto {
    return {
      id: cardioExerciseCompletion.id,
      cardioExerciseConfigurationId:
        cardioExerciseCompletion.cardioExerciseConfiguration.id,
      workoutSessionId: cardioExerciseCompletion.workoutSession.id,
      isCompleted: cardioExerciseCompletion.isCompleted,
      createdAt: cardioExerciseCompletion.createdAt,
      updatedAt: cardioExerciseCompletion.updatedAt,
    };
  }

  async create(
    createCardioExerciseCompletionDto: CreateCardioExerciseCompletionDto
  ): Promise<CardioExerciseCompletionDto> {
    const cardioExerciseConfiguration =
      await this.cardioExerciseConfigurationsRepo.findOneBy({
        id: createCardioExerciseCompletionDto.cardioExerciseConfigurationId,
      });
    if (!cardioExerciseConfiguration) {
      throw new NotFoundException('Cardio exercise configuration not found');
    }
    const workoutSession = await this.workoutSessionsRepo.findOneBy({
      id: createCardioExerciseCompletionDto.workoutSessionId,
    });
    if (!workoutSession) {
      throw new NotFoundException('Workout session not found');
    }
    const newCardioExerciseCompletion =
      this.cardioExerciseCompletionsRepo.create({
        cardioExerciseConfiguration,
        workoutSession,
        isCompleted: createCardioExerciseCompletionDto.isCompleted,
      });
    return this.toDto(
      await this.cardioExerciseCompletionsRepo.save(newCardioExerciseCompletion)
    );
  }

  async findAll(): Promise<CardioExerciseCompletionDto[]> {
    return (
      await this.cardioExerciseCompletionsRepo.find({
        relations: ['cardioExerciseConfiguration', 'workoutSession'],
      })
    ).map(this.toDto);
  }

  async findByWorkoutSessionId(
    workoutSessionId: string
  ): Promise<CardioExerciseCompletionDto[]> {
    const workoutSession = await this.workoutSessionsRepo.findOneBy({
      id: workoutSessionId,
    });
    if (!workoutSession) {
      throw new NotFoundException('Workout session not found');
    }
    return (
      await this.cardioExerciseCompletionsRepo.find({
        where: { workoutSession: { id: workoutSession.id } },
        relations: ['cardioExerciseConfiguration', 'workoutSession'],
      })
    ).map(this.toDto);
  }

  async findById(id: string): Promise<CardioExerciseCompletionDto | null> {
    const cardioExerciseCompletion =
      await this.cardioExerciseCompletionsRepo.findOne({
        where: { id },
        relations: ['cardioExerciseConfiguration', 'workoutSession'],
      });
    return cardioExerciseCompletion
      ? this.toDto(cardioExerciseCompletion)
      : null;
  }

  async update(
    id: string,
    updateCardioExerciseCompletionDto: UpdateCardioExerciseCompletionDto
  ): Promise<CardioExerciseCompletionDto> {
    const cardioExerciseCompletionToUpdate =
      await this.cardioExerciseCompletionsRepo.findOne({
        where: { id },
        relations: ['cardioExerciseConfiguration', 'workoutSession'],
      });
    if (!cardioExerciseCompletionToUpdate) {
      throw new NotFoundException('Cardio exercise completion not found');
    }
    cardioExerciseCompletionToUpdate.isCompleted =
      updateCardioExerciseCompletionDto.isCompleted;
    return this.toDto(
      await this.cardioExerciseCompletionsRepo.save(
        cardioExerciseCompletionToUpdate
      )
    );
  }

  async delete(id: string): Promise<CardioExerciseCompletionDto> {
    const cardioExerciseCompletionToDelete = await this.findById(id);
    if (!cardioExerciseCompletionToDelete) {
      throw new NotFoundException('Cardio exercise completion not found');
    }
    await this.cardioExerciseCompletionsRepo.delete({ id });
    return cardioExerciseCompletionToDelete;
  }
}
