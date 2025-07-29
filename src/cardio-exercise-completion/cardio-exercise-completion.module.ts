import { Module } from '@nestjs/common';
import { CardioExerciseCompletionService } from './cardio-exercise-completion.service';
import { CardioExerciseCompletionController } from './cardio-exercise-completion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardioExerciseCompletion } from './entities/cardio-exercise-completion.entity';
import { CardioExerciseConfiguration } from 'src/cardio-exercise-configuration/entities/cardio-exercise-configuration.entity';
import { WorkoutSession } from 'src/workout-session/entities/workout-session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CardioExerciseCompletion,
      CardioExerciseConfiguration,
      WorkoutSession,
    ]),
  ],
  controllers: [CardioExerciseCompletionController],
  providers: [CardioExerciseCompletionService],
})
export class CardioExerciseCompletionModule {}
