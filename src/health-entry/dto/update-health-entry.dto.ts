import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UpdateHealthEntryDto {
  @ApiProperty({ example: 0 })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  stepsCount: number;
}
