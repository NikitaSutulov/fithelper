import {
  IsAlphanumeric,
  IsDateString,
  IsEmail,
  IsIn,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'username' })
  @IsNotEmpty()
  @IsAlphanumeric()
  username: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '2000-12-30' })
  @IsNotEmpty()
  @IsDateString()
  birthdate: string;

  @ApiProperty({ example: 'male' })
  @IsNotEmpty()
  @IsIn(['female', 'male'])
  gender: string;

  @ApiProperty({ example: 175 })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  height: number;

  @ApiProperty({ example: null })
  @IsString()
  @IsOptional()
  profilePicture?: string;

  @ApiProperty({ example: '2000-12-30T21:00:00.122Z' })
  @IsISO8601()
  @IsNotEmpty()
  createdAt: string;

  @ApiProperty({ example: '2000-12-30T21:00:00.122Z' })
  @IsISO8601()
  @IsNotEmpty()
  updatedAt: string;
}
