import { PickType } from '@nestjs/swagger';
import { WorkoutDto } from './workout.dto';

export class UpdateWorkoutDto extends PickType(WorkoutDto, [
  'name',
  'isPublic',
] as const) {}
