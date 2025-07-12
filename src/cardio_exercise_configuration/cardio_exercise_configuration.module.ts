import { Module } from '@nestjs/common';
import { CardioExerciseConfigurationService } from './cardio_exercise_configuration.service';
import { CardioExerciseConfigurationController } from './cardio_exercise_configuration.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardioExerciseConfiguration } from './entities/cardio_exercise_configuration.entity';
import { ExerciseModule } from 'src/exercise/exercise.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CardioExerciseConfiguration]),
    ExerciseModule,
  ],
  controllers: [CardioExerciseConfigurationController],
  providers: [CardioExerciseConfigurationService],
})
export class CardioExerciseConfigurationModule {}
