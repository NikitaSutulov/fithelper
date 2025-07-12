import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreateCardioExerciseConfigurationDto {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsUUID()
  @IsNotEmpty()
  exerciseId: string;

  @ApiProperty({ example: 600 })
  @IsNumber()
  @IsPositive()
  time: number;
}
