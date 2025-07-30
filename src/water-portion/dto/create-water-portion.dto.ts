import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsInt, IsPositive } from 'class-validator';

export class CreateWaterPortionDto {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsUUID()
  @IsNotEmpty()
  healthEntryId: string;

  @ApiProperty({ example: 250 })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  amount: number;
}
