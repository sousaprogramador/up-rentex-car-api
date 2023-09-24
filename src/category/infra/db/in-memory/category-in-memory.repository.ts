import { SortDirection } from '../../../../@seedwork/domain';
import { InMemorySearchableRepository } from '../../../../@seedwork/domain';
import { Category, CategoryId } from '../../../domain/entities';
import CategoryRepository from '../../../domain/repository/category.repository';

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<
    Category,
    CategoryId,
    CategoryRepository.Filter
  >
  implements CategoryRepository.Repository
{
  sortableFields: string[] = ['name', 'created_at'];

  protected async applyFilter(
    items: Category[],
    filter: CategoryRepository.Filter,
  ): Promise<Category[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      const containsName =
        filter.name &&
        i.props.name.toLowerCase().includes(filter.name.toLowerCase());

      return containsName;
    });
  }

  protected async applySort(
    items: Category[],
    sort: string | null,
    sort_dir: SortDirection | null,
  ): Promise<Category[]> {
    return !sort
      ? super.applySort(items, 'created_at', 'desc')
      : super.applySort(items, sort, sort_dir);
  }
}

export default CategoryInMemoryRepository;
