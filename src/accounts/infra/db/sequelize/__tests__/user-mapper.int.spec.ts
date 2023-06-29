import { UserModel } from '../user.model';
import { UserModelMapper } from '../user.repository';
import { LoadEntityError } from '../../../../../@seedwork/domain';
import { User, UserId } from '../../../../domain/entities';
import { setupSequelize } from '../../../../../@seedwork/infra';

describe('UserModelMapper Unit Tests', () => {
  setupSequelize({ models: [UserModel] });

  it('should throws error when cast member is invalid', () => {
    const model = UserModel.build({
      id: '9366b7dc-2d71-4799-b91c-c64adb205104',
    });
    try {
      UserModelMapper.toEntity(model);
      fail('The user is valid, but it needs throws a LoadEntityError');
    } catch (e) {
      expect(e).toBeInstanceOf(LoadEntityError);
      expect(e.error).toMatchObject({
        name: [
          'name should not be empty',
          'name must be shorter than or equal to 255 characters',
          'name must be a string',
        ],
        email: [
          'email must be an email',
          'email should not be empty',
          'email must be shorter than or equal to 255 characters',
          'email must be a string',
        ],
        password: [
          'password should not be empty',
          'password must be shorter than or equal to 255 characters',
          'password must be a string',
        ],
        driver_licenses: [
          'driver_licenses should not be empty',
          'driver_licenses must be a string',
        ],
      });
    }
  });

  it('should throw a generic error', () => {
    const error = new Error('Generic Error');
    const spyValidate = jest.spyOn(User, 'validate').mockImplementation(() => {
      throw error;
    });
    const model = UserModel.build({
      id: '9366b7dc-2d71-4799-b91c-c64adb205104',
    });
    expect(() => UserModelMapper.toEntity(model)).toThrow(error);
    expect(spyValidate).toHaveBeenCalled();
    spyValidate.mockRestore();
  });

  it('should convert a user model to a user entity', () => {
    const created_at = new Date();
    const model = UserModel.build({
      id: '5490020a-e866-4229-9adc-aa44b83234c4',
      name: 'Some testing',
      email: 'mail@testing.com',
      password: '123456',
      driver_licenses: 'AB',
      created_at,
    });
    const entity = UserModelMapper.toEntity(model);
    expect(entity.toJSON()).toEqual(
      new User(
        {
          name: 'Some testing',
          email: 'mail@testing.com',
          password: '123456',
          driver_licenses: 'AB',
          created_at,
        },
        new UserId('5490020a-e866-4229-9adc-aa44b83234c4'),
      ).toJSON(),
    );
  });
});
