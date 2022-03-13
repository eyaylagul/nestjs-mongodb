import { Module } from '@nestjs/common';
import { RecordService } from './services/record.service';
import { RecordController } from './controllers/record.controller';
import { RecordRepository } from './repositories/record.repository';
import { MongooseModule } from "@nestjs/mongoose";
import { Record, RecordSchema } from "./schemas/record.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Record.name,
        schema: RecordSchema
      }
    ])
  ],
  providers: [RecordService, RecordRepository],
  controllers: [RecordController],
})
export class RecordModule {}
