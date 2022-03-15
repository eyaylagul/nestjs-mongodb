import { IsDate, IsNotEmpty, IsNumber, Min } from "class-validator";
import {Transform} from "class-transformer";
import { ApiProperty } from '@nestjs/swagger';
import { IsBiggerThan } from "../../../application/validators/IsBiggerThan";
import { IsBeforeThan } from "../../../application/validators/IsBeforeThan";

export class ListRequest {
  @ApiProperty({
    description: 'The start of day for records. [YYYY-MM-DD]',
    type: Date,
  })
  @IsNotEmpty()
  @IsDate()
  @Transform(({value}) => new Date(value), {toClassOnly: true})
  @IsBeforeThan('endDate', {
    message: 'startDate must be before than endDate',
  })
  startDate: Date;

  @ApiProperty({
    description: 'The end of day for records. [YYYY-MM-DD]',
    type: Date,
  })
  @IsNotEmpty()
  @IsDate()
  @Transform(({value}) => new Date(value), {toClassOnly: true})
  endDate: Date;

  @ApiProperty({
    description: 'The min count of record',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  minCount: number;

  @ApiProperty({
    description: 'The max count of record',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @IsBiggerThan('minCount', {
    message: 'maxCount must be larger than minCount',
  })
  maxCount: number;
}
