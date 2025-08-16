import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsISO8601, IsNotEmpty, IsUUID } from 'class-validator';

export class MuscleDto {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'Biceps' })
  @IsNotEmpty()
  @IsAlpha()
  name: string;

  @ApiProperty({ example: '2000-12-30T21:00:00.122Z' })
  @IsISO8601()
  @IsNotEmpty()
  createdAt: string;

  @ApiProperty({ example: '2000-12-30T21:00:00.122Z' })
  @IsISO8601()
  @IsNotEmpty()
  updatedAt: string;
}
