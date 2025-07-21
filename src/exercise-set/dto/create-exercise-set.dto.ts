import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsUUID, Min } from 'class-validator';

export class CreateExerciseSetDto {
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
