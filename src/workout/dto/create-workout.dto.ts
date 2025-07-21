import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkoutDto {
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
}
