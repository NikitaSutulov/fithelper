import {
  IsArray,
  IsBoolean,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
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
  @IsOptional()
  authorId: string | null;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsNotEmpty()
  isPublic: boolean;

  @ApiProperty({
    isArray: true,
    type: String,
    example: ['00000000-0000-0000-0000-000000000000'],
  })
  @IsArray()
  @IsUUID('all', { each: true })
  cardioExerciseConfigurationIds: string[];

  @ApiProperty({
    isArray: true,
    type: String,
    example: ['00000000-0000-0000-0000-000000000000'],
  })
  @IsArray()
  @IsUUID('all', { each: true })
  strengthExerciseConfigurationIds: string[];

  @ApiProperty({ example: '2000-12-30T21:00:00.122Z' })
  @IsISO8601()
  @IsNotEmpty()
  createdAt: string;

  @ApiProperty({ example: '2000-12-30T21:00:00.122Z' })
  @IsISO8601()
  @IsNotEmpty()
  updatedAt: string;
}
