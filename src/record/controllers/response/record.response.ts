import { ApiProperty } from '@nestjs/swagger';
import { RecordModel } from "../../models/record.model";

export enum Code {
  success = 0,
  error = 1
}

export class RecordResponse {
  @ApiProperty()
  code: Code

  @ApiProperty()
  message: string;

  @ApiProperty({type: [RecordModel] })
  records: RecordModel[];
}
