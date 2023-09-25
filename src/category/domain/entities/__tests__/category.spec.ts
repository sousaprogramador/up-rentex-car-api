import { Category } from '../category';
import { omit } from 'lodash';

describe('Category Unit Tests', () => {
  test('constructor of Category', () => {
    const category = new Category({
      name: 'Some testing',
      description: 'test a description',
    });
    const props = omit(category.props, 'created_at');
    //expect(user.validate).toHaveBeenCalled();
    expect(props).toStrictEqual({
      name: 'Some testing',
      description: 'test a description',
    });
    expect(category.props.created_at).toBeInstanceOf(Date);
  });
});
