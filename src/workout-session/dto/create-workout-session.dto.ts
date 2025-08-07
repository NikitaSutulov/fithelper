import { PickType } from '@nestjs/swagger';
import { WorkoutSessionDto } from './workout-session.dto';

export class CreateWorkoutSessionDto extends PickType(WorkoutSessionDto, [
  'userWorkoutId',
  'healthEntryId',
] as const) {}
