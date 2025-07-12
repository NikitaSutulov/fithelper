import { PartialType } from '@nestjs/swagger';
import { CreateCardioExerciseConfigurationDto } from './create-cardio_exercise_configuration.dto';

export class UpdateCardioExerciseConfigurationDto extends PartialType(
  CreateCardioExerciseConfigurationDto
) {}
