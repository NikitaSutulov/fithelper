import { Module } from '@nestjs/common';
import { StrengthExerciseCompletionService } from './strength-exercise-completion.service';
import { StrengthExerciseCompletionController } from './strength-exercise-completion.controller';
import { StrengthExerciseCompletion } from './entities/strength-exercise-completion.entity';
import { StrengthExerciseConfiguration } from 'src/strength-exercise-configuration/entities/strength-exercise-configuration.entity';
import { WorkoutSession } from 'src/workout-session/entities/workout-session.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StrengthExerciseCompletion,
      StrengthExerciseConfiguration,
      WorkoutSession,
    ]),
  ],
  controllers: [StrengthExerciseCompletionController],
  providers: [StrengthExerciseCompletionService],
})
export class StrengthExerciseCompletionModule {}
