import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsBoolean } from 'class-validator';

export class UpdateStrengthExerciseCompletionDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  @IsNotEmpty()
  isCompleted: boolean;
}
