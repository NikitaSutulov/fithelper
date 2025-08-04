import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class DishDto {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'Boiled chicken breast' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'A breast of a chicken boiled with salt.' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ example: 165.0 })
  @IsNumber()
  @Min(0)
  calories: number;

  @ApiProperty({ example: 31.0 })
  @IsNumber()
  @Min(0)
  proteins: number;

  @ApiProperty({ example: 3.6 })
  @IsNumber()
  @Min(0)
  fats: number;

  @ApiProperty({ example: 0.0 })
  @IsNumber()
  @Min(0)
  carbohydrates: number;
}
