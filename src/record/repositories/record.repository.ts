import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Record, RecordDocument } from "../schemas/record.schema";
import { ListRequest } from "../controllers/requests/list.request";
import { RecordModel } from "../models/record.model";

@Injectable()
export class RecordRepository {
  constructor(@InjectModel(Record.name) private recordModel: Model<RecordDocument>) {}

  async create({key, value, counts, createdAt}): Promise<Record> {
    return this.recordModel.create({
      key,
      value,
      counts,
      createdAt
    });
  }

  async getByFilter(listRequest: ListRequest): Promise<RecordModel[]> {
    return this.recordModel.aggregate([
      { $project: { key: 1, createdAt: 1, totalCount: { $sum: '$counts' } } },
      {
        $match: {
          createdAt: {
            $gte: listRequest.startDate,
            $lte: listRequest.endDate,
          },
          totalCount: {
            $gte: listRequest.minCount,
            $lte: listRequest.maxCount,
          },
        },
      },
    ]);
  }

  async truncate() {
    return this.recordModel.deleteMany({});
  }
}
