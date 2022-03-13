import { Test } from '@nestjs/testing';
import { RecordModule } from "../src/record/record.module";
import { TerminusModule } from "@nestjs/terminus";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { HealthController } from "../src/application/health.controller";


export default Test.createTestingModule({
  imports: [
    RecordModule,
    TerminusModule,
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGODB_URI") || "mongodb://localhost/nest"
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [HealthController],
  providers: []
});
