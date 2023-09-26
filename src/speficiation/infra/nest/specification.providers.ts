import { getModelToken } from '@nestjs/sequelize';
import {
  CreateSpecificationUseCase,
  UpdateSpecificationUseCase,
  ListSpecificationsUseCase,
  GetSpecificationUseCase,
  DeleteSpecificationUseCase,
} from '../../application/use-cases';
import SpecificationRepository from '../../domain/repository/specification.repository';
import {
  SpecificationInMemoryRepository,
  SpecificationModel,
  SpecificationSequelizeRepository,
} from '../db';

export namespace SPECIFICATION_PROVIDERS {
  export namespace REPOSITORIES {
    export const SPECIFICATION_IN_MEMORY_REPOSITORY = {
      provide: 'SpecificationInMemoryRepository',
      useClass: SpecificationInMemoryRepository,
    };

    export const SPECIFICATION_SEQUELIZE_REPOSITORY = {
      provide: 'SpecificationSequelizeRepository',
      useFactory: (specificationModel: typeof SpecificationModel) => {
        return new SpecificationSequelizeRepository(specificationModel);
      },
      inject: [getModelToken(SpecificationModel)],
    };

    export const SPECIFICATION_REPOSITORY = {
      provide: 'SpecificationSequelizeRepository',
      useExisting: 'SpecificationSequelizeRepository',
    };
  }

  export namespace USE_CASES {
    export const CREATE_SPECIFICATION_USE_CASE = {
      provide: CreateSpecificationUseCase.UseCase,
      useFactory: (specRep: SpecificationRepository.Repository) => {
        return new CreateSpecificationUseCase.UseCase(specRep);
      },
      inject: [REPOSITORIES.SPECIFICATION_REPOSITORY.provide],
    };

    export const UPDATE_SPECIFICATION_USE_CASE = {
      provide: UpdateSpecificationUseCase.UseCase,
      useFactory: (specRep: SpecificationRepository.Repository) => {
        return new UpdateSpecificationUseCase.UseCase(specRep);
      },
      inject: [REPOSITORIES.SPECIFICATION_REPOSITORY.provide],
    };

    export const LIST_SPECIFICATIONS_USE_CASE = {
      provide: ListSpecificationsUseCase.UseCase,
      useFactory: (specRep: SpecificationRepository.Repository) => {
        return new ListSpecificationsUseCase.UseCase(specRep);
      },
      inject: [REPOSITORIES.SPECIFICATION_REPOSITORY.provide],
    };

    export const GET_SPECIFICATION_USE_CASE = {
      provide: GetSpecificationUseCase.UseCase,
      useFactory: (specRep: SpecificationRepository.Repository) => {
        return new GetSpecificationUseCase.UseCase(specRep);
      },
      inject: [REPOSITORIES.SPECIFICATION_REPOSITORY.provide],
    };

    export const DELETE_SPECIFICATION_USE_CASE = {
      provide: DeleteSpecificationUseCase.UseCase,
      useFactory: (specRep: SpecificationRepository.Repository) => {
        return new DeleteSpecificationUseCase.UseCase(specRep);
      },
      inject: [REPOSITORIES.SPECIFICATION_REPOSITORY.provide],
    };
  }
}
