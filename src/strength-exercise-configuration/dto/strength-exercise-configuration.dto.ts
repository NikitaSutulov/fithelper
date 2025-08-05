import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsISO8601, IsNotEmpty, IsUUID } from 'class-validator';

export class StrengthExerciseConfigurationDto {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsUUID()
  @IsNotEmpty()
  exerciseId: string;

  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsUUID()
  @IsNotEmpty()
  workoutId: string;

  @ApiProperty({
    isArray: true,
    type: String,
    example: ['00000000-0000-0000-0000-000000000000'],
  })
  @IsArray()
  @IsUUID('all', { each: true })
  exerciseSetIds: string[];

  @ApiProperty({ example: '2000-12-30T21:00:00.122Z' })
  @IsISO8601()
  @IsNotEmpty()
  createdAt: string;
}
