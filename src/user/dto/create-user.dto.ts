import { ApiProperty, OmitType } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto extends OmitType(UserDto, [
  'id',
  'role',
  'createdAt',
  'updatedAt',
] as const) {
  @ApiProperty({ example: '$tr0nG_Passw0rd' })
  @IsNotEmpty()
  password: string;
}
