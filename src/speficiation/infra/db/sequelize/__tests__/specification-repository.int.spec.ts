import { SpecificationSequelizeRepository } from '../specification.repository';
import { SpecificationModel } from '../specification.model';
import { Specification, SpecificationId } from '../../../../domain/entities';
import { setupSequelize } from '../../../../../@seedwork/infra';
import { NotFoundError } from '../../../../../@seedwork/domain';
import { SpecificationRepository } from '../../../../domain/repository';

describe('SpecificationSequelizeRepository Unit Tests', () => {
  setupSequelize({ models: [SpecificationModel] });

  let repository: SpecificationSequelizeRepository;

  beforeEach(async () => {
    repository = new SpecificationSequelizeRepository(SpecificationModel);
  });

  it('should inserts a new entity', async () => {
    let specification = new Specification({
      name: 'Some testing',
      description: 'same a desciprtion',
    });
    await repository.insert(specification);
    let entity = await repository.findById(specification.id);
    expect(entity.toJSON()).toStrictEqual(specification.toJSON());

    specification = new Specification({
      name: 'Some testing',
      description: 'same a desciprtion',
    });
    await repository.insert(specification);
    entity = await repository.findById(specification.id);
    expect(entity.toJSON()).toStrictEqual(specification.toJSON());
  });

  it('should throws error when entity not found', async () => {
    await expect(repository.findById('fake id')).rejects.toThrow(
      new NotFoundError('Entity Not Found using ID fake id'),
    );

    await expect(
      repository.findById(
        new SpecificationId('9366b7dc-2d71-4799-b91c-c64adb205104'),
      ),
    ).rejects.toThrow(
      new NotFoundError(
        `Entity Not Found using ID 9366b7dc-2d71-4799-b91c-c64adb205104`,
      ),
    );
  });

  it('should finds a entity by id', async () => {
    const entity = new Specification({
      name: 'Some testing',
      description: 'same a desciprtion',
    });
    await repository.insert(entity);

    let entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());

    entityFound = await repository.findById(entity.entityId);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  it('should return all categories', async () => {
    const entity = new Specification({
      name: 'Some testing',
      description: 'same a desciprtion',
    });
    await repository.insert(entity);
    const entities = await repository.findAll();
    expect(entities).toHaveLength(1);
    expect(JSON.stringify(entities)).toBe(JSON.stringify([entity]));
  });

  it('should throw error on update when a entity not found', async () => {
    const entity = new Specification({
      name: 'Some testing',
      description: 'same a desciprtion',
    });
    await expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID ${entity.id}`),
    );
  });

  it('should update a entity', async () => {
    const entity = new Specification({
      name: 'Some testing',
      description: 'same a desciprtion',
    });
    await repository.insert(entity);

    entity.update({
      name: 'Some testing updated',
      description: 'same a desciprtion',
    });
    await repository.update(entity);

    const entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  it('should throw error on delete when a entity not found', async () => {
    await expect(repository.delete('fake id')).rejects.toThrow(
      new NotFoundError('Entity Not Found using ID fake id'),
    );

    await expect(
      repository.delete(
        new SpecificationId('9366b7dc-2d71-4799-b91c-c64adb205104'),
      ),
    ).rejects.toThrow(
      new NotFoundError(
        `Entity Not Found using ID 9366b7dc-2d71-4799-b91c-c64adb205104`,
      ),
    );
  });
  it('should delete a entity', async () => {
    const entity = new Specification({
      name: 'Some testing',
      description: 'same a desciprtion',
    });
    await repository.insert(entity);

    await repository.delete(entity.id);

    await expect(repository.findById(entity.id)).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID ${entity.id}`),
    );
  });

  it('should apply paginate and filter', async () => {
    const categories = [
      Specification.fake()
        .aSpecification()
        .withName('test')
        .withDescription('aaaa')
        .withCreatedAt(new Date(new Date().getTime() + 5000))
        .build(),
      Specification.fake()
        .aSpecification()
        .withName('a')
        .withDescription('aaaa')
        .withCreatedAt(new Date(new Date().getTime() + 4000))
        .build(),
      Specification.fake()
        .aSpecification()
        .withName('TEST')
        .withDescription('aaaa')
        .withCreatedAt(new Date(new Date().getTime() + 3000))
        .build(),
      Specification.fake()
        .aSpecification()
        .withName('TeSt')
        .withDescription('aaaa')
        .withCreatedAt(new Date(new Date().getTime() + 1000))
        .build(),
    ];

    await repository.bulkInsert(categories);

    let searchOutput = await repository.search(
      SpecificationRepository.SearchParams.create({
        page: 1,
        per_page: 2,
        filter: { name: 'TEST' },
      }),
    );
    expect(searchOutput.toJSON(true)).toMatchObject(
      new SpecificationRepository.SearchResult({
        items: [categories[0], categories[2]],
        total: 3,
        current_page: 1,
        per_page: 2,
        sort: null,
        sort_dir: null,
        filter: { name: 'TEST' },
      }).toJSON(true),
    );

    searchOutput = await repository.search(
      SpecificationRepository.SearchParams.create({
        page: 2,
        per_page: 2,
        filter: { name: 'TEST' },
      }),
    );
    expect(searchOutput.toJSON(true)).toMatchObject(
      new SpecificationRepository.SearchResult({
        items: [categories[3]],
        total: 3,
        current_page: 2,
        per_page: 2,
        sort: null,
        sort_dir: null,
        filter: { name: 'TEST' },
      }).toJSON(true),
    );
  });
});
