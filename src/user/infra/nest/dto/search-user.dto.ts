import { Transform } from 'class-transformer';
import { ListUsersUseCase } from '../../../application';
import { SortDirection } from '../../../../@seedwork/domain';

export class SearchUserDto implements ListUsersUseCase.Input {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  @Transform(({ value }) => {
    if (value) {
      return {
        ...(value.name && { name: value.name }),
        ...(value.email && {
          email: value.email,
        }),
      };
    }

    return value;
  })
  filter?: {
    name?: string;
    email?: string;
  };
}
