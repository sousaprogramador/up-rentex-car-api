import ListSpecificationsUseCase from '../list-specifications.use-case';
import { Specification } from '../../../domain/entities';
import SpecificationInMemoryRepository from '../../../infra/db/in-memory/specification-in-memory.repository';
import SpecificationRepository from '../../../domain/repository/specification.repository';

describe('ListSpecificationsUseCase Unit Tests', () => {
  let useCase: ListSpecificationsUseCase.UseCase;
  let repository: SpecificationInMemoryRepository;

  beforeEach(() => {
    repository = new SpecificationInMemoryRepository();
    useCase = new ListSpecificationsUseCase.UseCase(repository);
  });

  test('toOutput method', () => {
    let result = new SpecificationRepository.SearchResult({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort: null,
      sort_dir: null,
      filter: null,
    });
    let output = useCase['toOutput'](result);
    expect(output).toStrictEqual({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });

    const entity = new Specification({
      name: 'some test',
      description: 'some description',
    });

    result = new SpecificationRepository.SearchResult({
      items: [entity],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort: null,
      sort_dir: null,
      filter: null,
    });

    output = useCase['toOutput'](result);
    expect(output).toStrictEqual({
      items: [entity.toJSON()],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });
  });

  it('should return output sorted by created_at when input param is empty', async () => {
    const items = [
      new Specification({
        name: 'some test',
        description: 'some description',
      }),
      new Specification({
        name: 'some test 2',
        description: 'some description 2',
        created_at: new Date(new Date().getTime() + 100),
      }),
    ];
    repository.items = items;

    const output = await useCase.execute({});
    expect(output).toStrictEqual({
      items: [...items].reverse().map((i) => i.toJSON()),
      total: 2,
      current_page: 1,
      per_page: 15,
      last_page: 1,
    });
  });
});
