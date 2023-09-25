import DeleteSpecificationUseCase from '../delete-specification.use-case';
import { Specification } from '../../../domain/entities';
import SpecificationInMemoryRepository from '../../../infra/db/in-memory/specification-in-memory.repository';
import NotFoundError from '../../../../@seedwork/domain/errors/not-found.error';

describe('DeleteSpecificationUseCase Unit Tests', () => {
  let useCase: DeleteSpecificationUseCase.UseCase;
  let repository: SpecificationInMemoryRepository;

  beforeEach(() => {
    repository = new SpecificationInMemoryRepository();
    useCase = new DeleteSpecificationUseCase.UseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    await expect(() => useCase.execute({ id: 'fake id' })).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`),
    );
  });

  it('should delete a specification', async () => {
    const items = [
      new Specification({
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
