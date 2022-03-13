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

  afterEach(async () => {
    await repository.truncate();
  });

  it(`should filter records`, async () => {
      // prepare
      const now = new Date;
      const fiveMinAfterFromNow = new Date(now.getTime() + 5 * 60000);
      await repository.create({
        key: 'sample-key',
        value: 'sample-value',
        counts: [1, 2, 3],
        createdAt: now
      })
      // given
      const payload = {
        startDate: now.toISOString(),
        endDate: fiveMinAfterFromNow.toISOString(),
        minCount: 0,
        maxCount: 10
      };

      // when
      const result = await request(app.getHttpServer())
        .post(`/records`)
        .send(payload);

      // then
      expect(result.status).toBe(201);
      expect(result.body).toEqual({
        "code": 0,
        "message": "success",
        "records": [{
          key: "sample-key",
          createdAt: now.toISOString(),
          totalCount: 6
        }]
      })
    });
});
