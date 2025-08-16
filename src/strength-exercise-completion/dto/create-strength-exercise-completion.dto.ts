import { PickType } from '@nestjs/swagger';
import { StrengthExerciseCompletionDto } from './strength-exercise-completion.dto';

export class CreateStrengthExerciseCompletionDto extends PickType(
  StrengthExerciseCompletionDto,
  [
    'strengthExerciseConfigurationId',
    'workoutSessionId',
    'isCompleted',
  ] as const
) {}
