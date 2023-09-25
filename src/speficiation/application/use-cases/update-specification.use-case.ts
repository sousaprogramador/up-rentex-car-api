import SpecificationRepository from '../../domain/repository/specification.repository';
import {
  SpecificationOutput,
  SpecificationOutputMapper,
} from '../dto/Specification-output';
import { default as DefaultUseCase } from '../../../@seedwork/application/use-cases';

export namespace UpdateSpecificationUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepo: SpecificationRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.userRepo.findById(input.id);
      entity.update(input);
      await this.userRepo.update(entity);
      return SpecificationOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    id: string;
    name: string;
    description: string;
  };

  export type Output = SpecificationOutput;
}

export default UpdateSpecificationUseCase;
