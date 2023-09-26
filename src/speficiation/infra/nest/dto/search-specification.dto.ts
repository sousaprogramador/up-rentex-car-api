import { Transform } from 'class-transformer';
import { ListSpecificationsUseCase } from '../../../application';
import { SortDirection } from '../../../../@seedwork/domain';

export class SearchCategoryDto implements ListSpecificationsUseCase.Input {
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
