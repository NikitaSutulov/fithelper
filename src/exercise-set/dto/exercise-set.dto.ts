import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsNumber, Min, IsPositive } from 'class-validator';

export class ExerciseSetDto {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsUUID()
  @IsNotEmpty()
  strengthExerciseConfigurationId: string;

  @ApiProperty({ example: 50 })
  @IsNumber()
  @Min(0)
  weight: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @IsPositive()
  reps: number;
}
