import { PickType } from '@nestjs/swagger';
import { UserWorkoutDto } from './user-workout.dto';

export class CreateUserWorkoutDto extends PickType(UserWorkoutDto, [
  'userId',
  'workoutId',
] as const) {}
