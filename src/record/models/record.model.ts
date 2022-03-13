import { ApiProperty } from '@nestjs/swagger';

export class RecordModel {
  constructor({ key, createdAt, totalCount }) {
    this.key = key;
    this.createdAt = createdAt;
    this.totalCount = totalCount
  }

  @ApiProperty()
  key: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  totalCount: number;
}
