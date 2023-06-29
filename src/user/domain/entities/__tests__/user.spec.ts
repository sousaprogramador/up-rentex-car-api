import { User } from '../user';
import { omit } from 'lodash';
describe('User Unit Tests', () => {
  test('constructor of User', () => {
    const user = new User({
      name: 'Some testing',
      email: 'mail@testing.com',
      password: '123456',
      driver_licenses: 'AB',
    });
    const props = omit(user.props, 'created_at');
    //expect(user.validate).toHaveBeenCalled();
    expect(props).toStrictEqual({
      name: 'Some testing',
      email: 'mail@testing.com',
      is_active: true,
      driver_licenses: 'AB',
      avatar: null,
      password: '123456',
    });
    expect(user.props.created_at).toBeInstanceOf(Date);
  });
});
