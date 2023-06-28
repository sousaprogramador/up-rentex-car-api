import { SortDirection } from '../../../../@seedwork/domain';
import { InMemorySearchableRepository } from '../../../../@seedwork/domain';
import { User, UserId } from '../../../domain/entities';
import UserRepository from '../../../domain/repository/user.repository';

export class UserInMemoryRepository
  extends InMemorySearchableRepository<User, UserId>
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
      return i.props.name.toLowerCase().includes(filter.toLowerCase());
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
