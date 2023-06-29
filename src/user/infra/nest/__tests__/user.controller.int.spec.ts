import { NotFoundError } from '../../../../@seedwork/domain';
import {
  CreateUserUseCase,
  UpdateUserUseCase,
  ListUsersUseCase,
  GetUserUseCase,
} from '../../../application/useCases';
import { Test, TestingModule } from '@nestjs/testing';
