import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class CreateHealthEntryDto {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: 0 })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  stepsCount: number;
}
