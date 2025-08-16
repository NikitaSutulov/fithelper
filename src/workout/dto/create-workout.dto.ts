import { ApiProperty, PickType } from '@nestjs/swagger';
import { WorkoutDto } from './workout.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateWorkoutDto extends PickType(WorkoutDto, [
  'name',
  'isPublic',
] as const) {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsUUID()
  @IsNotEmpty()
  authorId: string;
}
