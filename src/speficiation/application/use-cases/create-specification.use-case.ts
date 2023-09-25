import { Specification } from '../../domain/entities';
import SpecificationRepository from '../../domain/repository/specification.repository';
import {
  SpecificationOutput,
  SpecificationOutputMapper,
} from '../dto/specification-output';
import { default as DefaultUseCase } from '../../../@seedwork/application/use-cases';

export namespace CreateSpecificationUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private specificationRepo: SpecificationRepository.Repository,
    ) {}

    async execute(input: Input): Promise<Output> {
      const entity = new Specification(input);
      await this.specificationRepo.insert(entity);
      return SpecificationOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    name: string;
    description: string;
  };

  export type Output = SpecificationOutput;
}
export default CreateSpecificationUseCase;
