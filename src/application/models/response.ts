import { ApiProperty } from '@nestjs/swagger';

enum Status {
  success = 'success',
  error = 'error',
}

export abstract class Response <T> {
  @ApiProperty()
  code: number;

  @ApiProperty()
  status: Status;
}
