import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsNotEmpty } from 'class-validator';

export class CreateMuscleDto {
  @ApiProperty({ example: 'Biceps' })
  @IsNotEmpty()
  @IsAlpha()
  name: string;
}
