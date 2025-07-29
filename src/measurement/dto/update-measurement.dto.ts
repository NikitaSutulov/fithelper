import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class UpdateMeasurementDto {
  @ApiProperty({ example: 70.0 })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  weight: number;
}
