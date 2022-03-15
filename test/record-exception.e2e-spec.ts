import TestApplication from './test-application';
import * as request from 'supertest';
import { RecordRepository } from "../src/record/repositories/record.repository";
import { ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "../src/application/filter/http-exception.filter";

describe('Record Exception Tests', () => {
  let app;
  let repository: RecordRepository;

  beforeAll(async () => {
    const moduleRef = await TestApplication.compile();
    repository = moduleRef.get(RecordRepository);
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      transform: true,
    }));
    app.useGlobalFilters(new HttpExceptionFilter())
    await app.init();
  });

  it(`should throw when startDate missing `, async () => {
    // given
    const payload = {
      endDate: '2018-02-02',
      minCount: 2700,
      maxCount: 3000
    };

    // when
    const result = await request(app.getHttpServer())
      .post(`/records`)
      .send(payload);

    // then
    expect(result.status).toBe(400);
    expect(result.body.message).toEqual([
      'startDate must be a Date instance',
      'startDate should not be empty'
    ]);
    expect(result.body.error).toEqual('Bad Request Exception');
  });

  it(`should throw when startDate format invalid `, async () => {
    // given
    const payload = {
      startDate: 'sample-date',
      endDate: '2018-02-02',
      minCount: 2700,
      maxCount: 3000
    };

    // when
    const result = await request(app.getHttpServer())
      .post(`/records`)
      .send(payload);

    // then
    expect(result.status).toBe(400);
    expect(result.body.message).toEqual([
      'startDate must be a Date instance',
    ]);
    expect(result.body.error).toEqual('Bad Request Exception');
  });

  it(`should throw when endDate missing `, async () => {
    // given
    const payload = {
      startDate: '2018-02-02',
      minCount: 2700,
      maxCount: 3000
    };

    // when
    const result = await request(app.getHttpServer())
      .post(`/records`)
      .send(payload);

    // then
    expect(result.status).toBe(400);
    expect(result.body.message).toEqual([
      'endDate must be a Date instance',
      'endDate should not be empty'
    ]);
    expect(result.body.error).toEqual('Bad Request Exception');
  });

  it(`should throw when endDate format invalid `, async () => {
    // given
    const payload = {
      startDate: '2016-01-06',
      endDate: 'invalid date',
      minCount: 2700,
      maxCount: 3000
    };

    // when
    const result = await request(app.getHttpServer())
      .post(`/records`)
      .send(payload);

    // then
    expect(result.status).toBe(400);
    expect(result.body.message).toEqual([
      'endDate must be a Date instance',
    ]);
    expect(result.body.error).toEqual('Bad Request Exception');
  });

  it(`should throw when minCount missing `, async () => {
    // given
    const payload = {
      startDate: '2016-01-06',
      endDate: '2018-02-02',
      maxCount: 3000
    };

    // when
    const result = await request(app.getHttpServer())
      .post(`/records`)
      .send(payload);

    // then
    expect(result.status).toBe(400);
    expect(result.body.message).toEqual([
      'minCount must not be less than 0',
      'minCount must be a number conforming to the specified constraints',
      'minCount should not be empty',
      'maxCount must be larger than minCount',
    ]);
    expect(result.body.error).toEqual('Bad Request Exception');
  });

  it(`should throw when minCount format invalid `, async () => {
    // given
    const payload = {
      startDate: '2016-01-06',
      endDate: '2018-02-02',
      minCount: '2700',
      maxCount: 3000
    };

    // when
    const result = await request(app.getHttpServer())
      .post(`/records`)
      .send(payload);

    // then
    expect(result.status).toBe(400);
    expect(result.body.message).toEqual([
      'minCount must not be less than 0',
      'minCount must be a number conforming to the specified constraints',
      'maxCount must be larger than minCount',
    ]);
    expect(result.body.error).toEqual('Bad Request Exception');
  });

  it(`should throw when maxCount missing `, async () => {
    // given
    const payload = {
      startDate: '2016-01-06',
      endDate: '2018-02-02',
      minCount: 2700
    };

    // when
    const result = await request(app.getHttpServer())
      .post(`/records`)
      .send(payload);

    // then
    expect(result.status).toBe(400);
    expect(result.body.message).toEqual([
      'maxCount must be larger than minCount',
      'maxCount must not be less than 0',
      'maxCount must be a number conforming to the specified constraints',
      'maxCount should not be empty',
    ]);
    expect(result.body.error).toEqual('Bad Request Exception');
  });

  it(`should throw when maxCount format invalid `, async () => {
    // given
    const payload = {
      startDate: '2016-01-06',
      endDate: '2018-02-02',
      minCount: 2700,
      maxCount: '3000'
    };

    // when
    const result = await request(app.getHttpServer())
      .post(`/records`)
      .send(payload);

    // then
    expect(result.status).toBe(400);
    expect(result.body.message).toEqual([
      'maxCount must be larger than minCount',
      'maxCount must not be less than 0',
      'maxCount must be a number conforming to the specified constraints'
    ]);
    expect(result.body.error).toEqual('Bad Request Exception');
  });

  it(`should throw when maxCount lower than minCount `, async () => {
    // given
    const payload = {
      startDate: '2016-01-06',
      endDate: '2018-02-02',
      minCount: 10,
      maxCount: 1
    };

    // when
    const result = await request(app.getHttpServer())
      .post(`/records`)
      .send(payload);

    // then
    expect(result.status).toBe(400);
    expect(result.body.message).toEqual([
      'maxCount must be larger than minCount',

    ]);
    expect(result.body.error).toEqual('Bad Request Exception');
  });
});
