import request from 'supertest';
import UserRepository from '../../src/user/domain/repository/user.repository';
import { USER_PROVIDERS } from '../../src/user/infra/nest/user.providers';
import { CreateUserFixture } from '../../src/user/infra/nest/fixtures';
import { UsersController } from '../../src/user/infra/nest/user.controller';
import { instanceToPlain } from 'class-transformer';
import { startApp } from '../../src/@seedwork/infra/nest/testing/helpers';
