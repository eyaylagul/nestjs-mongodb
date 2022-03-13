import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RecordDocument = Record & Document;

@Schema({ collection: 'records'})
export class Record {
  @Prop()
  key: string;

  @Prop({
    default: new Date
  })
  createdAt: Date;

  @Prop()
  counts: number[];
}

export const RecordSchema = SchemaFactory.createForClass(Record);
