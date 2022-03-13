import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ListRequest {
  @ApiProperty({
    description: 'The start of day for records. [YYYY-MM-DD]',
    type: Date,
  })
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @ApiProperty({
    description: 'The end of day for records. [YYYY-MM-DD]',
    type: Date,
  })
  @IsNotEmpty()
  @IsDateString()
  endDate: Date;

  @ApiProperty({
    description: 'The min count of record',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  minCount: number;

  @ApiProperty({
    description: 'The mac count of record',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  maxCount: number;
}
