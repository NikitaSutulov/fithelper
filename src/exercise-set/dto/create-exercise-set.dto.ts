import { PickType } from '@nestjs/swagger';
import { ExerciseSetDto } from './exercise-set.dto';

export class CreateExerciseSetDto extends PickType(ExerciseSetDto, [
  'strengthExerciseConfigurationId',
  'weight',
  'reps',
] as const) {}
