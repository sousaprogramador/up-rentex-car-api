import { instanceToPlain } from 'class-transformer';
import {
  CategoryCollectionPresenter,
  CategoryPresenter,
} from './category.presenter';
import { PaginationPresenter } from '../../../../@seedwork/infra/nest/presenters/pagination.presenter';

describe('CategoryPresenter Unit Tests', () => {
  describe('constructor', () => {
    it('should set values', () => {
      const created_at = new Date();
      const presenter = new CategoryPresenter({
        id: '61cd7b66-c215-4b84-bead-9aef0911aba7',
        name: 'some test',
        description: 'some a test',
        created_at,
      });

      expect(presenter.id).toBe('61cd7b66-c215-4b84-bead-9aef0911aba7');
      expect(presenter.name).toBe('some test');
      expect(presenter.description).toBe('some a test');
      expect(presenter.created_at).toBe(created_at);
    });

    it('should presenter data', () => {
      const created_at = new Date();
      let presenter = new CategoryPresenter({
        id: '61cd7b66-c215-4b84-bead-9aef0911aba7',
        name: 'some test',
        description: 'some a test',
        created_at,
      });

      let data = instanceToPlain(presenter);
      expect(data).toStrictEqual({
        id: '61cd7b66-c215-4b84-bead-9aef0911aba7',
        name: 'some test',
        description: 'some a test',
        created_at: created_at.toISOString().slice(0, 19) + '.000Z',
      });

      presenter = new CategoryPresenter({
        id: '61cd7b66-c215-4b84-bead-9aef0911aba7',
        name: 'some test',
        description: 'some a test',
        created_at,
      });

      data = instanceToPlain(presenter);
      expect(data).toStrictEqual({
        id: '61cd7b66-c215-4b84-bead-9aef0911aba7',
        name: 'some test',
        description: 'some a test',
        created_at: created_at.toISOString().slice(0, 19) + '.000Z',
      });
    });
  });
});

describe('CategoryCollectionPresenter Unit Tests', () => {
  describe('constructor', () => {
    it('should set values', () => {
      const created_at = new Date();
      const categoryActive = {
        id: '61cd7b66-c215-4b84-bead-9aef0911aba7',
        name: 'some test',
        description: 'some a test',
        created_at,
      };
      const presenter = new CategoryCollectionPresenter({
        items: [categoryActive],
        current_page: 1,
        per_page: 2,
        last_page: 3,
        total: 4,
      });

      expect(presenter.meta).toBeInstanceOf(PaginationPresenter);
      expect(presenter.meta).toEqual(
        new PaginationPresenter({
          current_page: 1,
          per_page: 2,
          last_page: 3,
          total: 4,
        }),
      );
      expect(presenter.data).toStrictEqual([
        new CategoryPresenter(categoryActive),
      ]);
    });
  });

  it('should presenter data', () => {
    const created_at = new Date();
    let presenter = new CategoryCollectionPresenter({
      items: [
        {
          id: '61cd7b66-c215-4b84-bead-9aef0911aba7',
          name: 'some test',
          description: 'some a test',
          created_at,
        },
      ],
      current_page: 1,
      per_page: 2,
      last_page: 3,
      total: 4,
    });

    expect(instanceToPlain(presenter)).toStrictEqual({
      meta: {
        current_page: 1,
        per_page: 2,
        last_page: 3,
        total: 4,
      },
      data: [
        {
          id: '61cd7b66-c215-4b84-bead-9aef0911aba7',
          name: 'some test',
          description: 'some a test',
          created_at: created_at.toISOString().slice(0, 19) + '.000Z',
        },
      ],
    });

    presenter = new CategoryCollectionPresenter({
      items: [
        {
          id: '61cd7b66-c215-4b84-bead-9aef0911aba7',
          name: 'some test',
          description: 'some a test',
          created_at,
        },
      ],
      current_page: '1' as any,
      per_page: '2' as any,
      last_page: '3' as any,
      total: '4' as any,
    });

    expect(instanceToPlain(presenter)).toStrictEqual({
      meta: {
        current_page: 1,
        per_page: 2,
        last_page: 3,
        total: 4,
      },
      data: [
        {
          id: '61cd7b66-c215-4b84-bead-9aef0911aba7',
          name: 'some test',
          description: 'some a test',
          created_at: created_at.toISOString().slice(0, 19) + '.000Z',
        },
      ],
    });
  });
});
