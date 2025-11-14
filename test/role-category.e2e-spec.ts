import { INestApplication } from '@nestjs/common';
import {
  cleanupTestData,
  closeAndStopDatabase,
  createTestDatabase,
  TestDatabaseInstance,
} from '../test-utils/database.helper';
import { Connection } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { RoleCategoryModule } from '../src/modules/role-category/role-category.module';
import { RoleCategoryDto } from '../src/modules/role-category/model/role-category.dto';
import request from 'supertest';

describe('Role Category E2E test', () => {
  let app: INestApplication;
  let dbInstance: TestDatabaseInstance;
  let mongoConnection: Connection;

  beforeAll(async () => {
    dbInstance = await createTestDatabase();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(dbInstance.uri), RoleCategoryModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    mongoConnection = moduleFixture.get<Connection>(getConnectionToken());
  });

  afterAll(async () => {
    await closeAndStopDatabase(mongoConnection, dbInstance);
    await app.close();
  });

  afterEach(async () => cleanupTestData(mongoConnection));

  it('should add a role category', async () => {
    const dto = new RoleCategoryDto('test');

    const response = await request(app.getHttpServer())
      .post('/role-category')
      .send(dto)
      .expect(201);

    expect((response.body as RoleCategoryDto).name).toEqual('test');
  });

  it('should find all categories', async () => {
    const dto1 = new RoleCategoryDto('test1');
    const dto2 = new RoleCategoryDto('test2');

    for (const dto of [dto1, dto2]) {
      await request(app.getHttpServer())
        .post('/role-category')
        .send(dto)
        .expect(201);
    }

    const response = await request(app.getHttpServer())
      .get('/role-category')
      .expect(200);

    const responseDtoList = response.body as RoleCategoryDto[];
    expect(responseDtoList).toHaveLength(2);
    expect(responseDtoList.map((it) => it.name)).toEqual(['test1', 'test2']);
  });
});
