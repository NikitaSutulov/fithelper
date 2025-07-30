import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsPositive } from 'class-validator';

export class UpdateWaterPortionDto {
  @ApiProperty({ example: 250 })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  amount: number;
}
