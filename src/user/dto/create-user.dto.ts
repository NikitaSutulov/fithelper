import {
  IsAlphanumeric,
  IsDateString,
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsStrongPassword,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'username' })
  @IsNotEmpty()
  @IsAlphanumeric()
  username: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '$tr0nG_Passw0rd' })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: '2000-12-30' })
  @IsNotEmpty()
  @IsDateString()
  birthdate: string;

  @ApiProperty({ example: 'male' })
  @IsNotEmpty()
  @IsIn(['female', 'male'])
  gender: string;

  @ApiProperty({ example: null })
  @IsInt()
  @Min(1)
  height: number;
}
