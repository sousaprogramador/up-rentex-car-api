import { Category } from '../../domain/entities';
import CategoryRepository from '../../domain/repository/category.repository';
import { CategoryOutput, CategoryOutputMapper } from '../dto/category-output';
import { default as DefaultUseCase } from '../../../@seedwork/application/use-cases';

export namespace CreateCategoryUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepo: CategoryRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = new Category(input);
      await this.userRepo.insert(entity);
      return CategoryOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    name: string;
    description: string;
  };

  export type Output = CategoryOutput;
}
export default CreateCategoryUseCase;
