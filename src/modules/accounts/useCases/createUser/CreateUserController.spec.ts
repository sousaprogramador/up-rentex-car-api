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
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should to be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'User test',
      password: 'acb123',
      email: 'testuser@uprental.com.br',
      driver_license: '1234567',
    });

    expect(response.status).toBe(201);
  });

  it('should not to be able to create a new user exists email', async () => {
    const response = await request(app).post('/users').send({
      name: 'User test',
      password: 'acb123',
      email: 'testuser@uprental.com.br',
      driver_license: '1234567',
    });

    expect(response.status).toBe(400);
  });
});
