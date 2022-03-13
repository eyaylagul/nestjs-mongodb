import { Controller, Post, Body, HttpStatus, UseInterceptors } from "@nestjs/common";
import { RecordService } from '../services/record.service';
import { ListRequest } from './requests/list.request';
import { ApiResponse } from '@nestjs/swagger';
import { TransformInterceptor } from "../../application/interceptors/transform.interceptor";
import { RecordResponse } from "./response/record.response";


@Controller('records')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  @UseInterceptors(TransformInterceptor)
  @ApiResponse({
    description: 'Creates new user object.',
    type: RecordResponse,
    status: HttpStatus.CREATED
  })
  async findAll(@Body() listRequest: ListRequest) {
    const records = await this.recordService.list(listRequest);

    return { records }
  }
}
