import { PartialType } from '@nestjs/swagger';
import { CreateExerciseSetDto } from './create-exercise-set.dto';

export class UpdateExerciseSetDto extends PartialType(CreateExerciseSetDto) {}
