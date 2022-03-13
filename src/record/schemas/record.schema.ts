import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RecordDocument = Record & Document;

@Schema()
export class Record {
  @Prop()
  key: string;

  @Prop()
  createdAt: Date;

  @Prop()
  count: number;
}

export const RecordSchema = SchemaFactory.createForClass(Record);
