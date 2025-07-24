import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsBoolean } from 'class-validator';

export class UserWorkoutDto {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsUUID()
  @IsNotEmpty()
  workoutId: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsNotEmpty()
  isOwner: boolean;
}
