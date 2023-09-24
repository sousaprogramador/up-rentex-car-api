import CreateCategoryUseCase from '../create-category.use-case';
import CategoryInMemoryRepository from '../../../infra/db/in-memory/category-in-memory.repository';

describe('CreateCategoryUseCase Unit Tests', () => {
  let useCase: CreateCategoryUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new CreateCategoryUseCase.UseCase(repository);
  });

  it('should create a category', async () => {
    const spyInsert = jest.spyOn(repository, 'insert');

    let output = await useCase.execute({
      name: 'some test',
      description: 'same description',
    });
    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: 'some test',
      description: 'same description',
      created_at: repository.items[0].created_at,
    });

    output = await useCase.execute({
      name: 'some test',
      description: 'same description 2',
    });
    expect(spyInsert).toHaveBeenCalledTimes(2);
    expect(output).toStrictEqual({
      id: repository.items[1].id,
      name: 'some test',
      description: 'same description 2',
      created_at: repository.items[1].created_at,
    });
  });
});
