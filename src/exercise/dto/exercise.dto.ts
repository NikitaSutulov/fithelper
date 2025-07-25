import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { MuscleDto } from 'src/muscle/dto';

export class ExerciseDto {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'Bench press' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example:
      'A weight training exercise where a person presses a weight upwards while lying horizontally on a weight training bench.',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    isArray: true,
    type: String,
    example: ['00000000-0000-0000-0000-000000000000'],
  })
  @IsArray()
  muscleIds: string[];
}
