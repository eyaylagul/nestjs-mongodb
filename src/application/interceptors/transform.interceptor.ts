import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { RecordModel } from "../../record/models/record.model";

export interface RecordResponse<T> {
  code: number;
  message: string;
  records: RecordModel[];
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, RecordResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<RecordResponse<T>> {
    return next
      .handle()
      .pipe(
        map((data) => ({
          code: data.code || 0 ,
          message: 'success',
          ...data
        })),
      );
  }
}
