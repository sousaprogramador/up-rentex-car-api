import { SortDirection } from '../../../../@seedwork/domain';
import { InMemorySearchableRepository } from '../../../../@seedwork/domain';
import { Specification, SpecificationId } from '../../../domain/entities';
import SpecificationRepository from '../../../domain/repository/specification.repository';

export class SpecificationInMemoryRepository
  extends InMemorySearchableRepository<
    Specification,
    SpecificationId,
    SpecificationRepository.Filter
  >
  implements SpecificationRepository.Repository
{
  sortableFields: string[] = ['name', 'created_at'];

  protected async applyFilter(
    items: Specification[],
    filter: SpecificationRepository.Filter,
  ): Promise<Specification[]> {
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
    items: Specification[],
    sort: string | null,
    sort_dir: SortDirection | null,
  ): Promise<Specification[]> {
    return !sort
      ? super.applySort(items, 'created_at', 'desc')
      : super.applySort(items, sort, sort_dir);
  }
}

export default SpecificationInMemoryRepository;
