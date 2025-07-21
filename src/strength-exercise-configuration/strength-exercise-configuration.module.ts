import { Module } from '@nestjs/common';
import { StrengthExerciseConfigurationService } from './strength-exercise-configuration.service';
import { StrengthExerciseConfigurationController } from './strength-exercise-configuration.controller';
import { ExerciseModule } from 'src/exercise/exercise.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StrengthExerciseConfiguration } from './entities/strength-exercise-configuration.entity';

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
