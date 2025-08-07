import { PickType } from '@nestjs/swagger';
import { StrengthExerciseConfigurationDto } from './strength-exercise-configuration.dto';

export class CreateStrengthExerciseConfigurationDto extends PickType(
  StrengthExerciseConfigurationDto,
  ['exerciseId', 'workoutId'] as const
) {}
