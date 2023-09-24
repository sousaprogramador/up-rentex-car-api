import { Transform } from 'class-transformer';
import { ListCategoriesUseCase } from '../../../application';
import { SortDirection } from '../../../../@seedwork/domain';

export class SearchCategoryDto implements ListCategoriesUseCase.Input {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  @Transform(({ value }) => {
    if (value) {
      return {
        ...(value.name && { name: value.name }),
      };
    }

    return value;
  })
  filter?: {
    name?: string;
  };
}
