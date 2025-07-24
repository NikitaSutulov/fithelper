import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateExerciseDto {
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
}
