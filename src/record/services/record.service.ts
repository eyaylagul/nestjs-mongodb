import { Injectable } from '@nestjs/common';
import { RecordRepository } from '../repositories/record.repository';
import { ListRequest } from '../controllers/requests/list.request';

@Injectable()
export class RecordService {
  constructor(private readonly recordRepository: RecordRepository) {}

  public async list(listRequest: ListRequest) {
    return listRequest;
  }
}
