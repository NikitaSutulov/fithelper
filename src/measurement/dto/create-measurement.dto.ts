import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreateMeasurementDto {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: 70.0 })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  weight: number;
}
