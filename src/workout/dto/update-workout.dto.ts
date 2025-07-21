import { OmitType } from '@nestjs/swagger';
import { CreateWorkoutDto } from './create-workout.dto';

export class UpdateWorkoutDto extends OmitType(CreateWorkoutDto, [
  'authorId' as const,
]) {}
