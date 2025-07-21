import { OmitType } from '@nestjs/swagger';
import { CreateExerciseSetDto } from './create-exercise-set.dto';

export class UpdateExerciseSetDto extends OmitType(CreateExerciseSetDto, [
  'strengthExerciseConfigurationId',
] as const) {}
