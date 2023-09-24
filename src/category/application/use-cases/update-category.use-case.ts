import CategoryRepository from '../../domain/repository/category.repository';
import { CategoryOutput, CategoryOutputMapper } from '../dto/category-output';
import { default as DefaultUseCase } from '../../../@seedwork/application/use-cases';

export namespace UpdateCategoryUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepo: CategoryRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.userRepo.findById(input.id);
      entity.update(input);
      await this.userRepo.update(entity);
      return CategoryOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    id: string;
    name: string;
    description: string;
  };

  export type Output = CategoryOutput;
}

export default UpdateCategoryUseCase;
