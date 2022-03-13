import { Module } from '@nestjs/common';
import { RecordService } from './services/record.service';
import { RecordController } from './controllers/record.controller';
import { RecordRepository } from './repositories/record.repository';

@Module({
  providers: [RecordService, RecordRepository],
  controllers: [RecordController],
})
export class RecordModule {}
