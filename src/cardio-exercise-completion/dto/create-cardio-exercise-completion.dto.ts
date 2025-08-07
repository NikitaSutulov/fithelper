import { PickType } from '@nestjs/swagger';
import { CardioExerciseCompletionDto } from './cardio-exercise-completion.dto';

export class CreateCardioExerciseCompletionDto extends PickType(
  CardioExerciseCompletionDto,
  ['cardioExerciseConfigurationId', 'workoutSessionId', 'isCompleted'] as const
) {}
