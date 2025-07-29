import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class HealthEntryDto {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: '2000-12-30' })
  @IsISO8601()
  @IsNotEmpty()
  entryDate: string;

  @ApiProperty({ example: 10000 })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  stepsCount: number;
}
