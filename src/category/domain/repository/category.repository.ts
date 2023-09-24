/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import {
  SearchableRepositoryInterface,
  SearchProps,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from '../../../@seedwork/domain/repository/repository-contracts';
import { Category, CategoryId } from '../entities';

export namespace CategoryRepository {
  export type Filter = {
    name?: string;
  };

  export class SearchParams extends DefaultSearchParams<Filter> {
    get filter(): Filter | null {
      return this._filter;
    }

    private constructor(props: SearchProps<Filter> = {}) {
      super(props);
    }

    static create(
      props: Omit<SearchProps<Filter>, 'filter'> & {
        filter?: {
          name?: string;
        };
      } = {},
    ) {
      return new SearchParams({
        ...props,
        filter: {
          name: props.filter?.name || null,
        },
      });
    }

    protected set filter(value: Filter | null) {
      const _value =
        !value || (value as unknown) === '' || typeof value !== 'object'
          ? null
          : value;

      const filter = {
        ...(_value.name && { name: `${_value?.name}` }),
      };

      this._filter = Object.keys(filter).length === 0 ? null : filter;
    }
  }

  export class SearchResult extends DefaultSearchResult<Category, Filter> {}

  export type Repository = SearchableRepositoryInterface<
    Category,
    CategoryId,
    Filter,
    SearchParams,
    SearchResult
  >;
}

export default CategoryRepository;
