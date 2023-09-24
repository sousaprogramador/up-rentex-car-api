import DeleteCategoryUseCase from '../delete-category.use-case';
import { Category } from '../../../domain/entities';
import CategoryInMemoryRepository from '../../../infra/db/in-memory/category-in-memory.repository';
import NotFoundError from '../../../../@seedwork/domain/errors/not-found.error';

describe('DeleteCategoryUseCase Unit Tests', () => {
  let useCase: DeleteCategoryUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new DeleteCategoryUseCase.UseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    await expect(() => useCase.execute({ id: 'fake id' })).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`),
    );
  });

  it('should delete a categroy', async () => {
    const items = [
      new Category({
        name: 'some test',
        description: 'some description',
      }),
    ];
    repository.items = items;
    await useCase.execute({
      id: items[0].id,
    });
    expect(repository.items).toHaveLength(0);
  });
});
