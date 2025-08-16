import { PickType } from '@nestjs/swagger';
import { ExerciseDto } from './exercise.dto';

export class CreateExerciseDto extends PickType(ExerciseDto, [
  'name',
  'description',
] as const) {}
