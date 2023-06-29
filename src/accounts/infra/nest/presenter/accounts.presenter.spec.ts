import { UserCollectionPresenter, UserPresenter } from './accounts.presenter';
import { instanceToPlain } from 'class-transformer';
import { PaginationPresenter } from '../../../../@seedwork/infra/nest/presenters/pagination.presenter';

describe('UserPresenter Unit Tests', () => {
  describe('constructor', () => {
    it('should set values', () => {
      const created_at = new Date();
      const presenter = new UserPresenter({
        id: '61cd7b66-c215-4b84-bead-9aef0911aba7',
        name: 'some test',
        email: 'sometest@mail.com',
        avatar: '',
        driver_licenses: '123AE',
        is_active: true,
        created_at,
      });

      expect(presenter.id).toBe('61cd7b66-c215-4b84-bead-9aef0911aba7');
      expect(presenter.name).toBe('some test');
      expect(presenter.email).toBe('sometest@mail.com');
      expect(presenter.avatar).toBe('');
      expect(presenter.driver_licenses).toBe('123AE');
      expect(presenter.is_active).toBeTruthy();
      expect(presenter.created_at).toBe(created_at);
    });

    it('should presenter data', () => {
      const created_at = new Date();
      let presenter = new UserPresenter({
        id: '61cd7b66-c215-4b84-bead-9aef0911aba7',
        name: 'some test',
        email: 'sometest@mail.com',
        avatar: '',
        driver_licenses: '123AE',
        is_active: true,
        created_at,
      });

      let data = instanceToPlain(presenter);
      expect(data).toStrictEqual({
        id: '61cd7b66-c215-4b84-bead-9aef0911aba7',
        name: 'some test',
        email: 'sometest@mail.com',
        avatar: '',
        driver_licenses: '123AE',
        is_active: true,
        created_at: created_at.toISOString().slice(0, 19) + '.000Z',
      });

      presenter = new UserPresenter({
        id: '61cd7b66-c215-4b84-bead-9aef0911aba7',
        name: 'some test',
        email: 'sometest@mail.com',
        avatar: '',
        driver_licenses: '123AB',
        is_active: false,
        created_at,
      });

      data = instanceToPlain(presenter);
      expect(data).toStrictEqual({
        id: '61cd7b66-c215-4b84-bead-9aef0911aba7',
        name: 'some test',
        email: 'sometest@mail.com',
        avatar: '',
        driver_licenses: '123AB',
        is_active: false,
        created_at: created_at.toISOString().slice(0, 19) + '.000Z',
      });
    });
  });
});

describe('UserCollectionPresenter Unit Tests', () => {
  describe('constructor', () => {
    it('should set values', () => {
      const created_at = new Date();
      const userActive = {
        id: '61cd7b66-c215-4b84-bead-9aef0911aba7',
        name: 'some test',
        email: 'sometest@mail.com',
        avatar: '',
        driver_licenses: '123AE',
        is_active: true,
        created_at,
      };
      let presenter = new UserCollectionPresenter({
        items: [userActive],
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
      expect(presenter.data).toStrictEqual([new UserPresenter(userActive)]);

      const userInactive = {
        id: '61cd7b66-c215-4b84-bead-9aef0911aba7',
        name: 'some test',
        email: 'sometest@mail.com',
        avatar: '',
        driver_licenses: '123AE',
        is_active: true,
        created_at,
      };

      presenter = new UserCollectionPresenter({
        items: [userInactive],
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
      expect(presenter.data).toStrictEqual([new UserPresenter(userInactive)]);
    });
  });

  it('should presenter data', () => {
    const created_at = new Date();
    let presenter = new UserCollectionPresenter({
      items: [
        {
          id: '61cd7b66-c215-4b84-bead-9aef0911aba7',
          name: 'some test',
          email: 'sometest@mail.com',
          avatar: '',
          driver_licenses: '123AE',
          is_active: true,
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
          email: 'sometest@mail.com',
          avatar: '',
          driver_licenses: '123AE',
          is_active: true,
          created_at: created_at.toISOString().slice(0, 19) + '.000Z',
        },
      ],
    });

    presenter = new UserCollectionPresenter({
      items: [
        {
          id: '61cd7b66-c215-4b84-bead-9aef0911aba7',
          name: 'some test',
          email: 'sometest@mail.com',
          avatar: '',
          driver_licenses: '123AE',
          is_active: false,
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
          email: 'sometest@mail.com',
          avatar: '',
          driver_licenses: '123AE',
          is_active: false,
          created_at: created_at.toISOString().slice(0, 19) + '.000Z',
        },
      ],
    });
  });
});
