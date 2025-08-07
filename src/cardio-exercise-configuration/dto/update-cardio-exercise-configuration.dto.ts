import { PickType } from '@nestjs/swagger';
import { CardioExerciseConfigurationDto } from './cardio-exercise-configuration.dto';

export class UpdateCardioExerciseConfigurationDto extends PickType(
  CardioExerciseConfigurationDto,
  ['time'] as const
) {}
