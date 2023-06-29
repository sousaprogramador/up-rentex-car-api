import { User } from '../../domain/entities';
import { UserOutputMapper } from './user-output';

describe('UserOutputMapper Unit Tests', () => {
  it('should convert a user in output', () => {
    const created_at = new Date();
    const entity = new User({
      name: 'Some testing',
      email: 'mail@testing.com',
      password: '123456',
      driver_licenses: 'AB',
      created_at: created_at,
    });
    const spyToJSON = jest.spyOn(entity, 'toJSON');
    const output = UserOutputMapper.toOutput(entity);
    expect(spyToJSON).toHaveBeenCalled();
    expect(output).toStrictEqual({
      id: entity.id,
      name: 'Some testing',
      email: 'mail@testing.com',
      password: '123456',
      driver_licenses: 'AB',
      is_active: true,
      avatar: null,
      created_at,
    });
  });
});
