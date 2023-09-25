import SpecificationRepository from '../../domain/repository/specification.repository';
import {
  SpecificationOutput,
  SpecificationOutputMapper,
} from '../dto/specification-output';
import { default as DefaultUseCase } from '../../../@seedwork/application/use-cases';
import { SearchInputDto } from '../../../@seedwork/application';
import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from '../../../@seedwork/application';

export namespace ListSpecificationsUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private specificationRepo: SpecificationRepository.Repository,
    ) {}

    async execute(input: Input): Promise<Output> {
      const params = SpecificationRepository.SearchParams.create(input);
      const searchResult = await this.specificationRepo.search(params);
      return this.toOutput(searchResult);
    }

    private toOutput(
      searchResult: SpecificationRepository.SearchResult,
    ): Output {
      const { items: _items } = searchResult;
      const items = _items.map((i) => {
        return SpecificationOutputMapper.toOutput(i);
      });
      return PaginationOutputMapper.toOutput(items, searchResult);
    }
  }

  export type Input = SearchInputDto<{ name?: string }>;

  export type Output = PaginationOutputDto<SpecificationOutput>;
}
export default ListSpecificationsUseCase;
