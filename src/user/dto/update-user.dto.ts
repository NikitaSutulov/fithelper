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

export class UpdateUserDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsDateString()
  birthdate: string;

  @IsNotEmpty()
  @IsIn(['female', 'male'])
  gender: string;

  @IsInt()
  @Min(1)
  height: number;
}
