import { PickType } from '@nestjs/swagger';
import { CardioExerciseCompletionDto } from './cardio-exercise-completion.dto';

export class UpdateCardioExerciseCompletionDto extends PickType(
  CardioExerciseCompletionDto,
  ['isCompleted'] as const
) {}
