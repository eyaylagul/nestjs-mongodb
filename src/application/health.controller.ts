import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheck,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
import { ApiTags } from "@nestjs/swagger";

@ApiTags('HealthCheck')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private readonly mongooseHealthIndicator: MongooseHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.mongooseHealthIndicator.pingCheck('mongo'),
    ]);
  }
}
