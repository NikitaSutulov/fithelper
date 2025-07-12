import { Module } from '@nestjs/common';
import { StrengthExerciseConfigurationService } from './strength_exercise_configuration.service';
import { StrengthExerciseConfigurationController } from './strength_exercise_configuration.controller';
import { ExerciseModule } from 'src/exercise/exercise.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StrengthExerciseConfiguration } from './entities/strength_exercise_configuration.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([StrengthExerciseConfiguration]),
    ExerciseModule,
  ],
  controllers: [StrengthExerciseConfigurationController],
  providers: [StrengthExerciseConfigurationService],
  exports: [StrengthExerciseConfigurationService],
})
export class StrengthExerciseConfigurationModule {}
