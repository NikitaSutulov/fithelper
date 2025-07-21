import { Module } from '@nestjs/common';
import { CardioExerciseConfigurationService } from './cardio-exercise-configuration.service';
import { CardioExerciseConfigurationController } from './cardio-exercise-configuration.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardioExerciseConfiguration } from './entities/cardio-exercise-configuration.entity';
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
