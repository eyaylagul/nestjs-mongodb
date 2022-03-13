import { ApiProperty } from '@nestjs/swagger';
import { Response } from '../../../application/models/response';
import { RecordModel } from "../../models/record.model";

export class RecordResponse extends Response<RecordResponse> {
  @ApiProperty({type: [RecordModel] })
  public records: RecordModel[];
}
