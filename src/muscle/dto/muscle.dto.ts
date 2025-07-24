import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsNotEmpty, IsUUID } from 'class-validator';

export class MuscleDto {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'Biceps' })
  @IsNotEmpty()
  @IsAlpha()
  name: string;
}
