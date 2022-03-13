import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { HealthController } from "./health.controller";
import { TerminusModule } from "@nestjs/terminus";
import { RecordModule } from "../record/record.module";

@Module({
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
})
export class AppModule {
}
