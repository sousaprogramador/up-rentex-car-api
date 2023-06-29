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
