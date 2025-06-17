import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateExerciseDto {
  @ApiProperty({ example: 'Bench press' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example:
      'A weight training exercise where a person presses a weight upwards while lying horizontally on a weight training bench.',
  })
  @IsOptional()
  description: string;
}
