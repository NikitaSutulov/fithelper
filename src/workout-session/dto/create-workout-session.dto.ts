import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsBoolean } from 'class-validator';

export class CreateWorkoutSessionDto {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsUUID()
  @IsNotEmpty()
  userWorkoutId: string;
}
