import { UsersController } from '../user.controller';
import { SortDirection } from '../../../../@seedwork/domain';
import {
  CreateUserUseCase,
  UpdateUserUseCase,
  ListUsersUseCase,
  GetUserUseCase,
} from '../../../application/useCases';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  UserCollectionPresenter,
  UserPresenter,
} from '../presenter/user.presenter';
import { UpdateUserDto } from '../dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    controller = new UsersController();
  });

  it('should creates a user', async () => {
    const output: CreateUserUseCase.Output = {
      id: '9366b7dc-2d71-4799-b91c-c64adb205104',
      name: 'Some testing',
      email: 'mail@testing.com',
      driver_licenses: 'AB',
      is_active: true,
      created_at: new Date(),
    };
    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    //@ts-expect-error define part of methods
    controller['createUseCase'] = mockCreateUseCase;
    const input: CreateUserDto = {
      name: 'Some testing',
      email: 'mail@testing.com',
      password: '123456',
      driver_licenses: 'AB',
      is_active: true,
    };
    const presenter = await controller.create(input);
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input);
    expect(presenter).toBeInstanceOf(UserPresenter);
    expect(presenter).toStrictEqual(UsersController.userToResponse(output));
  });

  it('should updates a user', async () => {
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    const output: UpdateUserUseCase.Output = {
      id,
      name: 'Some testing',
      email: 'mail@testing.com',
      driver_licenses: 'AB',
      is_active: true,
      created_at: new Date(),
    };
    const mockUpdateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    //@ts-expect-error defined part of methods
    controller['updateUseCase'] = mockUpdateUseCase;
    const input: UpdateUserDto = {
      name: 'Some testing',
      email: 'mail@testing.com',
      password: '123456',
      driver_licenses: 'AB',
      is_active: true,
    };
    const presenter = await controller.update(id, input);
    expect(mockUpdateUseCase.execute).toHaveBeenCalledWith({ id, ...input });
    expect(presenter).toBeInstanceOf(UserPresenter);
    expect(presenter).toStrictEqual(UsersController.userToResponse(output));
  });

  it('should deletes a user', async () => {
    const expectedOutput = undefined;
    const mockDeleteUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    //@ts-expect-error define part of methods
    controller['deleteUseCase'] = mockDeleteUseCase;
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    expect(controller.remove(id)).toBeInstanceOf(Promise);
    const output = await controller.remove(id);
    expect(mockDeleteUseCase.execute).toHaveBeenCalledWith({ id });
    expect(expectedOutput).toStrictEqual(output);
  });

  it('should gets a user', async () => {
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    const output: GetUserUseCase.Output = {
      id,
      name: 'Some testing',
      email: 'mail@testing.com',
      driver_licenses: 'AB',
      is_active: true,
      created_at: new Date(),
    };
    const mockGetUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    //@ts-expect-error defined part of methods
    controller['getUseCase'] = mockGetUseCase;
    const presenter = await controller.findOne(id);
    expect(mockGetUseCase.execute).toHaveBeenCalledWith({ id });
    expect(presenter).toBeInstanceOf(UserPresenter);
    expect(presenter).toStrictEqual(UsersController.userToResponse(output));
  });

  it('should list users', async () => {
    const output: ListUsersUseCase.Output = {
      items: [
        {
          id: '9366b7dc-2d71-4799-b91c-c64adb205104',
          name: 'Some testing',
          email: 'mail@testing.com',
          driver_licenses: 'AB',
          is_active: true,
          created_at: new Date(),
        },
      ],
      current_page: 1,
      last_page: 1,
      per_page: 1,
      total: 1,
    };
    const mockListUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    //@ts-expect-error define part of methods
    controller['listUseCase'] = mockListUseCase;
    const searchParams = {
      page: 1,
      per_page: 2,
      sort: 'name',
      sort_dir: 'desc' as SortDirection,
      filter: { name: 'actor test' },
    };
    const presenter = await controller.search(searchParams);
    expect(presenter).toBeInstanceOf(UserCollectionPresenter);
    expect(mockListUseCase.execute).toHaveBeenCalledWith(searchParams);
    expect(presenter).toEqual(new UserCollectionPresenter(output));
  });
});
