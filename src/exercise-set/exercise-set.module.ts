import { Module } from '@nestjs/common';
import { ExerciseSetService } from './exercise-set.service';
import { ExerciseSetController } from './exercise-set.controller';
import { StrengthExerciseConfigurationModule } from 'src/strength-exercise-configuration/strength-exercise-configuration.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseSet } from './entities/exercise-set.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExerciseSet]),
    StrengthExerciseConfigurationModule,
  ],
  controllers: [ExerciseSetController],
  providers: [ExerciseSetService],
})
export class ExerciseSetModule {}
