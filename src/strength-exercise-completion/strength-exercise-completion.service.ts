import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StrengthExerciseCompletion } from './entities/strength-exercise-completion.entity';
import { Repository } from 'typeorm';
import {
  CreateStrengthExerciseCompletionDto,
  StrengthExerciseCompletionDto,
  UpdateStrengthExerciseCompletionDto,
} from './dto';
import { StrengthExerciseConfiguration } from 'src/strength-exercise-configuration/entities/strength-exercise-configuration.entity';
import { WorkoutSession } from 'src/workout-session/entities/workout-session.entity';

@Injectable()
export class StrengthExerciseCompletionService {
  constructor(
    @InjectRepository(StrengthExerciseCompletion)
    private readonly strengthExerciseCompletionsRepo: Repository<StrengthExerciseCompletion>,
    @InjectRepository(StrengthExerciseConfiguration)
    private readonly strengthExerciseConfigurationsRepo: Repository<StrengthExerciseConfiguration>,
    @InjectRepository(WorkoutSession)
    private readonly workoutSessionsRepo: Repository<WorkoutSession>
  ) {}

  private toDto(
    strengthExerciseCompletion: StrengthExerciseCompletion
  ): StrengthExerciseCompletionDto {
    return {
      id: strengthExerciseCompletion.id,
      strengthExerciseConfigurationId:
        strengthExerciseCompletion.strengthExerciseConfiguration.id,
      workoutSessionId: strengthExerciseCompletion.workoutSession.id,
      isCompleted: strengthExerciseCompletion.isCompleted,
      createdAt: strengthExerciseCompletion.createdAt,
      updatedAt: strengthExerciseCompletion.updatedAt,
    };
  }

  async create(
    createStrengthExerciseCompletionDto: CreateStrengthExerciseCompletionDto
  ): Promise<StrengthExerciseCompletionDto> {
    const strengthExerciseConfiguration =
      await this.strengthExerciseConfigurationsRepo.findOneBy({
        id: createStrengthExerciseCompletionDto.strengthExerciseConfigurationId,
      });
    if (!strengthExerciseConfiguration) {
      throw new NotFoundException('Strength exercise configuration not found');
    }
    const workoutSession = await this.workoutSessionsRepo.findOneBy({
      id: createStrengthExerciseCompletionDto.workoutSessionId,
    });
    if (!workoutSession) {
      throw new NotFoundException('Workout session not found');
    }
    const newStrengthExerciseCompletion =
      this.strengthExerciseCompletionsRepo.create({
        strengthExerciseConfiguration,
        workoutSession,
        isCompleted: createStrengthExerciseCompletionDto.isCompleted,
      });
    return this.toDto(
      await this.strengthExerciseCompletionsRepo.save(
        newStrengthExerciseCompletion
      )
    );
  }

  async findAll(): Promise<StrengthExerciseCompletionDto[]> {
    return (
      await this.strengthExerciseCompletionsRepo.find({
        relations: ['strengthExerciseConfiguration', 'workoutSession'],
      })
    ).map(this.toDto);
  }

  async findByWorkoutSessionId(
    workoutSessionId: string
  ): Promise<StrengthExerciseCompletionDto[]> {
    const workoutSession = await this.workoutSessionsRepo.findOneBy({
      id: workoutSessionId,
    });
    if (!workoutSession) {
      throw new NotFoundException('Workout session not found');
    }
    return (
      await this.strengthExerciseCompletionsRepo.find({
        where: { workoutSession: { id: workoutSession.id } },
        relations: ['strengthExerciseConfiguration', 'workoutSession'],
      })
    ).map(this.toDto);
  }

  async findById(id: string): Promise<StrengthExerciseCompletionDto | null> {
    const strengthExerciseCompletion =
      await this.strengthExerciseCompletionsRepo.findOne({
        where: { id },
        relations: ['strengthExerciseConfiguration', 'workoutSession'],
      });
    return strengthExerciseCompletion
      ? this.toDto(strengthExerciseCompletion)
      : null;
  }

  async update(
    id: string,
    updateStrengthExerciseCompletionDto: UpdateStrengthExerciseCompletionDto
  ): Promise<StrengthExerciseCompletionDto> {
    const strengthExerciseCompletionToUpdate =
      await this.strengthExerciseCompletionsRepo.findOne({
        where: { id },
        relations: ['strengthExerciseConfiguration', 'workoutSession'],
      });
    if (!strengthExerciseCompletionToUpdate) {
      throw new NotFoundException('Strength exercise completion not found');
    }
    strengthExerciseCompletionToUpdate.isCompleted =
      updateStrengthExerciseCompletionDto.isCompleted;
    return this.toDto(
      await this.strengthExerciseCompletionsRepo.save(
        strengthExerciseCompletionToUpdate
      )
    );
  }

  async delete(id: string): Promise<StrengthExerciseCompletionDto> {
    const strengthExerciseCompletionToDelete = await this.findById(id);
    if (!strengthExerciseCompletionToDelete) {
      throw new NotFoundException('Strength exercise completion not found');
    }
    await this.strengthExerciseCompletionsRepo.delete({ id });
    return strengthExerciseCompletionToDelete;
  }
}
