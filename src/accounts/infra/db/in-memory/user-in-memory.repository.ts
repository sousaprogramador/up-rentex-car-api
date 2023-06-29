import { SortDirection } from '../../../../@seedwork/domain';
import { InMemorySearchableRepository } from '../../../../@seedwork/domain';
import { User, UserId } from '../../../domain/entities';
import UserRepository from '../../../domain/repository/user.repository';

export class UserInMemoryRepository
  extends InMemorySearchableRepository<User, UserId, UserRepository.Filter>
  implements UserRepository.Repository
{
  sortableFields: string[] = ['name', 'created_at'];

  protected async applyFilter(
    items: User[],
    filter: UserRepository.Filter,
  ): Promise<User[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      const containsName =
        filter.name &&
        i.props.name.toLowerCase().includes(filter.name.toLowerCase());
      const hasType =
        filter.email &&
        i.props.email.toLowerCase().includes(filter.email.toLowerCase());
      return containsName && hasType;
    });
  }

  protected async applySort(
    items: User[],
    sort: string | null,
    sort_dir: SortDirection | null,
  ): Promise<User[]> {
    return !sort
      ? super.applySort(items, 'created_at', 'desc')
      : super.applySort(items, sort, sort_dir);
  }
}

export default UserInMemoryRepository;
