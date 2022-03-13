import { ApiProperty } from '@nestjs/swagger';

export class RecordModel {
  @ApiProperty()
  key: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  count: number;
}
