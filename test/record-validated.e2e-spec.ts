import TestApplication from './test-application';
import * as request from 'supertest';
import { RecordRepository } from "../src/record/repositories/record.repository";
import { ValidationPipe } from "@nestjs/common";

describe('Record Tests', () => {
  let app;
  let repository: RecordRepository;

  beforeAll(async () => {
    const moduleRef = await TestApplication.compile();
    repository = moduleRef.get(RecordRepository);
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      transform: true,
    }));
    await app.init();
  });


  it(`should filter records`, async () => {
      // given
      const payload = {
        startDate: '2016-01-26',
        endDate: '2018-02-02',
        minCount: 2700,
        maxCount: 3000
      };

      // when
      const result = await request(app.getHttpServer())
        .post(`/records`)
        .send(payload);

      // then
      expect(result.status).toBe(201);
    });
});
