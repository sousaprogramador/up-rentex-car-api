import SpecificationRepository from '../../domain/repository/specification.repository';
import { default as DefaultUseCase } from '../../../@seedwork/application/use-cases';

export namespace DeleteSpecificationUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private specificationRepository: SpecificationRepository.Repository,
    ) {}

    async execute(input: Input): Promise<Output> {
      await this.specificationRepository.delete(input.id);
    }
  }

  export type Input = {
    id: string;
  };

  type Output = void;
}

export default DeleteSpecificationUseCase;
