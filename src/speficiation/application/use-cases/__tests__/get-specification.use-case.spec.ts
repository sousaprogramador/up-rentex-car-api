import GetSpecificationUseCase from '../get-specification.use-case';
import { Specification } from '../../../domain/entities';
import SpecificationInMemoryRepository from '../../../infra/db/in-memory/specification-in-memory.repository';
import NotFoundError from '../../../../@seedwork/domain/errors/not-found.error';

describe('GetSpecificationUseCase Unit Tests', () => {
  let useCase: GetSpecificationUseCase.UseCase;
  let repository: SpecificationInMemoryRepository;

  beforeEach(() => {
    repository = new SpecificationInMemoryRepository();
    useCase = new GetSpecificationUseCase.UseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    await expect(() => useCase.execute({ id: 'fake id' })).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`),
    );
  });

  it('should returns a Specification', async () => {
    const items = [
      new Specification({
        name: 'some test',
        description: 'some description',
      }),
    ];
    repository.items = items;
    const spyFindById = jest.spyOn(repository, 'findById');
    const output = await useCase.execute({ id: items[0].id });
    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: items[0].id,
      name: 'some test',
      description: 'some description',
      created_at: items[0].created_at,
    });
  });
});
