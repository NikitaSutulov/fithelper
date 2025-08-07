import { PickType } from '@nestjs/swagger';
import { CardioExerciseConfigurationDto } from './cardio-exercise-configuration.dto';

export class CreateCardioExerciseConfigurationDto extends PickType(
  CardioExerciseConfigurationDto,
  ['exerciseId', 'workoutId', 'time'] as const
) {}
