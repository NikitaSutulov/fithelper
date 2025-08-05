import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsBoolean, IsISO8601 } from 'class-validator';

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

  @ApiProperty({ example: '2000-12-30T21:00:00.122Z' })
  @IsISO8601()
  @IsNotEmpty()
  createdAt: string;
}
