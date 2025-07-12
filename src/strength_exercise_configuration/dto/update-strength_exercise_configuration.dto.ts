import { PartialType } from '@nestjs/swagger';
import { CreateStrengthExerciseConfigurationDto } from './create-strength_exercise_configuration.dto';

export class UpdateStrengthExerciseConfigurationDto extends PartialType(
  CreateStrengthExerciseConfigurationDto
) {}
