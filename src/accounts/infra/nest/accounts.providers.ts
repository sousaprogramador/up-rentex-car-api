import { getModelToken } from '@nestjs/sequelize';
import {
  CreateUserUseCase,
  UpdateUserUseCase,
  ListUsersUseCase,
  GetUserUseCase,
  DeleteUserUseCase,
} from '../../application/useCases';
import UserRepository from '../../domain/repository/user.repository';
import {
  UserInMemoryRepository,
  UserModel,
  UserRepository as UserSequelize,
} from '../db';

export namespace USER_PROVIDERS {
  export namespace REPOSITORIES {
    export const USER_IN_MEMORY_REPOSITORY = {
      provide: 'UserInMemoryRepository',
      useClass: UserInMemoryRepository,
    };

    export const USER_SEQUELIZE_REPOSITORY = {
      provide: 'UserSequelizeRepository',
      useFactory: (categoryModel: typeof UserModel) => {
        return new UserSequelize(categoryModel);
      },
      inject: [getModelToken(UserModel)],
    };

    export const USER_REPOSITORY = {
      provide: 'UserRepository',
      useExisting: 'UserInMemoryRepository',
    };
  }

  export namespace USE_CASES {
    export const CREATE_USER_USE_CASE = {
      provide: CreateUserUseCase.UseCase,
      useFactory: (categoryRepo: UserRepository.Repository) => {
        return new CreateUserUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.USER_REPOSITORY.provide],
    };

    export const UPDATE_USER_USE_CASE = {
      provide: UpdateUserUseCase.UseCase,
      useFactory: (categoryRepo: UserRepository.Repository) => {
        return new UpdateUserUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.USER_REPOSITORY.provide],
    };

    export const LIST_USERS_USE_CASE = {
      provide: ListUsersUseCase.UseCase,
      useFactory: (categoryRepo: UserRepository.Repository) => {
        return new ListUsersUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.USER_REPOSITORY.provide],
    };

    export const GET_USER_USE_CASE = {
      provide: GetUserUseCase.UseCase,
      useFactory: (categoryRepo: UserRepository.Repository) => {
        return new GetUserUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.USER_REPOSITORY.provide],
    };

    export const DELETE_USER_USE_CASE = {
      provide: DeleteUserUseCase.UseCase,
      useFactory: (categoryRepo: UserRepository.Repository) => {
        return new DeleteUserUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.USER_REPOSITORY.provide],
    };
  }
}
