import { PartialType } from '@nestjs/swagger';
import { CreateStrengthExerciseConfigurationDto } from './create-strength-exercise-configuration.dto';

export class UpdateStrengthExerciseConfigurationDto extends PartialType(
  CreateStrengthExerciseConfigurationDto
) {}
