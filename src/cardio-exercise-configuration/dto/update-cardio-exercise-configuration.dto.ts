import { PickType } from '@nestjs/swagger';
import { CreateCardioExerciseConfigurationDto } from './create-cardio-exercise-configuration.dto';

export class UpdateCardioExerciseConfigurationDto extends PickType(
  CreateCardioExerciseConfigurationDto,
  ['time'] as const
) {}
