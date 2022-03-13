import { Controller, Post, Body, HttpStatus } from "@nestjs/common";
import { RecordService } from '../services/record.service';
import { ListRequest } from './requests/list.request';
import { ApiResponse } from '@nestjs/swagger';
import { RecordResponse } from "./response/record.response";

@Controller('records')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  @ApiResponse({
    description: 'Creates new user object.',
    type: RecordResponse,
    status: HttpStatus.OK
  })
  findAll(@Body() listRequest: ListRequest) {
    return this.recordService.list(listRequest);
  }
}
