import { Module } from '@nestjs/common';
import { ExerciseSetService } from './exercise_set.service';
import { ExerciseSetController } from './exercise_set.controller';
import { StrengthExerciseConfigurationModule } from 'src/strength_exercise_configuration/strength_exercise_configuration.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseSet } from './entities/exercise_set.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExerciseSet]),
    StrengthExerciseConfigurationModule,
  ],
  controllers: [ExerciseSetController],
  providers: [ExerciseSetService],
})
export class ExerciseSetModule {}
