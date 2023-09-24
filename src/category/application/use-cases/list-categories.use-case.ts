import CategoryRepository from '../../domain/repository/category.repository';
import { CategoryOutput, CategoryOutputMapper } from '../dto/category-output';
import { default as DefaultUseCase } from '../../../@seedwork/application/use-cases';
import { SearchInputDto } from '../../../@seedwork/application';
import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from '../../../@seedwork/application';

export namespace ListCategoriesUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private categoryRepo: CategoryRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = CategoryRepository.SearchParams.create(input);
      const searchResult = await this.categoryRepo.search(params);
      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: CategoryRepository.SearchResult): Output {
      const { items: _items } = searchResult;
      const items = _items.map((i) => {
        return CategoryOutputMapper.toOutput(i);
      });
      return PaginationOutputMapper.toOutput(items, searchResult);
    }
  }

  export type Input = SearchInputDto<{ name?: string }>;

  export type Output = PaginationOutputDto<CategoryOutput>;
}
export default ListCategoriesUseCase;
