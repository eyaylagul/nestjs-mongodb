import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { Code } from "../../record/controllers/response/record.response";

interface HttpExceptionInterface {
  statusCode: number;
  message: [];
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const {message} = exception.getResponse() as HttpExceptionInterface;

    response
      .status(status)
      .json({
        code: Code.error,
        message,
        error: exception.message
      });
  }
}
