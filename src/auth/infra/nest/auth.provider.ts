import { getModelToken } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { AuthUserUseCase } from '../../application';
import { AuthSequelizeRepository } from '../db/sequelize';
import { AuthRepositoryInterface } from '../../domain/repository';
import { Cryptography } from '../bcrypt';
import { UserModel } from '../../../user/infra/db';
import { JWT_CONSTANTS, JWT_EXPIRES_IN } from '../../../setting';

export namespace AUTH_PROVIDERS {
  export namespace REPOSITORIES {
    export const AUTH_SEQUELIZE_REPOSITORY = {
      provide: 'AuthSequelizeRepository',
      useFactory: (userModel: typeof UserModel) => {
        return new AuthSequelizeRepository(userModel);
      },
      inject: [getModelToken(UserModel)],
    };

    export const AUTH_REPOSITORY = {
      provide: 'AuthSequelizeRepository',
      useExisting: 'AuthSequelizeRepository',
    };
  }

  export namespace USE_CASES {
    export const AUTH_USER_USE_CASE = {
      provide: AuthUserUseCase.UseCase,
      useFactory: (authRepo: AuthRepositoryInterface) => {
        return new AuthUserUseCase.UseCase(
          authRepo,
          new Cryptography(),
          new JwtService({
            secret: JWT_CONSTANTS,
            signOptions: { expiresIn: JWT_EXPIRES_IN },
          }),
        );
      },
      inject: [REPOSITORIES.AUTH_REPOSITORY.provide],
    };
  }
}
