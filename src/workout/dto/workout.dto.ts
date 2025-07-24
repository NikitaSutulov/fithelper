import {
  IsArray,
  IsBoolean,
  IsISO8601,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WorkoutDto {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'Full-body workout' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsUUID()
  @IsNotEmpty()
  authorId: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsNotEmpty()
  isPublic: boolean;

  @ApiProperty({ example: '2000-12-30T21:00:00.122Z' })
  @IsISO8601()
  @IsNotEmpty()
  updateTime: string;

  @ApiProperty({
    isArray: true,
    type: String,
    example: ['00000000-0000-0000-0000-000000000000'],
  })
  @IsArray()
  cardioExerciseConfigurationIds: string[];

  @ApiProperty({
    isArray: true,
    type: String,
    example: ['00000000-0000-0000-0000-000000000000'],
  })
  @IsArray()
  strengthExerciseConfigurationIds: string[];
}
