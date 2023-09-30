import { SortDirection } from '../../../../@seedwork/domain';
import { InMemorySearchableRepository } from '../../../../@seedwork/domain';
import { Car, CarId } from '../../../domain/entities';
import CarRepository from '../../../domain/repository/Car.repository';

export class CarInMemoryRepository
  extends InMemorySearchableRepository<Car, CarId, CarRepository.Filter>
  implements CarRepository.Repository
{
  sortableFields: string[] = ['name', 'created_at'];

  protected async applyFilter(
    items: Car[],
    filter: CarRepository.Filter,
  ): Promise<Car[]> {
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
    items: Car[],
    sort: string | null,
    sort_dir: SortDirection | null,
  ): Promise<Car[]> {
    return !sort
      ? super.applySort(items, 'created_at', 'desc')
      : super.applySort(items, sort, sort_dir);
  }
}

export default CarInMemoryRepository;
