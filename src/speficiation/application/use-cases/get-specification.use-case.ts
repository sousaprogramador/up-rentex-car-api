import SpecificationRepository from '../../domain/repository/specification.repository';
import {
  SpecificationOutput,
  SpecificationOutputMapper,
} from '../dto/specification-output';
import { default as DefaultUseCase } from '../../../@seedwork/application/use-cases';

export namespace GetSpecificationUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private specificationRepo: SpecificationRepository.Repository,
    ) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.specificationRepo.findById(input.id);
      return SpecificationOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    id: string;
  };

  export type Output = SpecificationOutput;
}
export default GetSpecificationUseCase;
