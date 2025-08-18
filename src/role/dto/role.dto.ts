import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class RoleDto {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'user' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
