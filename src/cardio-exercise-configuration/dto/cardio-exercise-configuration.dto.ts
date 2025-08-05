import { ApiProperty } from '@nestjs/swagger';
import {
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
} from 'class-validator';

export class CardioExerciseConfigurationDto {
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

  @ApiProperty({ example: 600 })
  @IsNumber()
  @IsPositive()
  time: number;

  @ApiProperty({ example: '2000-12-30T21:00:00.122Z' })
  @IsISO8601()
  @IsNotEmpty()
  createdAt: string;

  @ApiProperty({ example: '2000-12-30T21:00:00.122Z' })
  @IsISO8601()
  @IsNotEmpty()
  updatedAt: string;
}
