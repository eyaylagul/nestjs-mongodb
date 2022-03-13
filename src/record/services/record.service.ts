import { Injectable } from '@nestjs/common';
import { RecordRepository } from '../repositories/record.repository';
import { ListRequest } from '../controllers/requests/list.request';
import { RecordModel } from "../models/record.model";

@Injectable()
export class RecordService {
  constructor(private readonly recordRepository: RecordRepository) {}

  public async list(listRequest: ListRequest): Promise<RecordModel[]> {
    return (await this.recordRepository.getByFilter(listRequest))
      .map(record => new RecordModel({
        key: record.key,
        createdAt: record.createdAt,
        totalCount: record.totalCount
      }));
  }
}
