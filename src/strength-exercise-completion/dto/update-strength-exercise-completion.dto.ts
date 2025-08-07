import { PickType } from '@nestjs/swagger';
import { StrengthExerciseCompletionDto } from './strength-exercise-completion.dto';

export class UpdateStrengthExerciseCompletionDto extends PickType(
  StrengthExerciseCompletionDto,
  ['isCompleted'] as const
) {}
