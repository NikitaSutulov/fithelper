import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3MjJlZTE2ZS1lMTZiLTQ2ZWEtOTc1OC1mZTJkNGFmOTBmOWMiLCJ1c2VybmFtZSI6Im5pa2l0YSIsImlhdCI6MTc1MDI2MDYxNiwiZXhwIjoxNzUwMjYwNjc2fQ.KV4Jw4CJDN6fkvHxcLCCdnXw5cJqF6tMPV0m7pWaruo',
  })
  accessToken: string;
}
