import CreateSpecificationUseCase from '../create-specification.use-case';
import SpecificationInMemoryRepository from '../../../infra/db/in-memory/specification-in-memory.repository';

describe('CreateSpecificationUseCase Unit Tests', () => {
  let useCase: CreateSpecificationUseCase.UseCase;
  let repository: SpecificationInMemoryRepository;

  beforeEach(() => {
    repository = new SpecificationInMemoryRepository();
    useCase = new CreateSpecificationUseCase.UseCase(repository);
  });

  it('should create a specification', async () => {
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
