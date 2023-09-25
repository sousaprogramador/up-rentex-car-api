import { Specification } from '../specificiation';
import { omit } from 'lodash';

describe('Specification Unit Tests', () => {
  test('constructor of Specification', () => {
    const specification = new Specification({
      name: 'Some testing',
      description: 'test a description',
    });
    const props = omit(specification.props, 'created_at');
    //expect(user.validate).toHaveBeenCalled();
    expect(props).toStrictEqual({
      name: 'Some testing',
      description: 'test a description',
    });
    expect(specification.props.created_at).toBeInstanceOf(Date);
  });
});
