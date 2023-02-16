import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Authenticate User Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash('admin123', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, is_admin, created_at, driver_license) 
      VALUES('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should to be able to authenticate user', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin123',
    });

    expect(response.status).toBe(201);
  });
});
