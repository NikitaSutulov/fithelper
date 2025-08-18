import { ApiProperty } from '@nestjs/swagger';

export class UserInfoDto {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  id: string;

  @ApiProperty({ example: 'username' })
  username: string;

  @ApiProperty({ example: 'user' })
  role: string;
}
