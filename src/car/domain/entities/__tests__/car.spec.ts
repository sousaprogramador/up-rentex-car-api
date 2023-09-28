import {
  Specification,
  SpecificationId,
} from '../../../../speficiation/domain';
import { Car } from '../car';
import { omit } from 'lodash';

describe('Car Unit Tests', () => {
  test('constructor of Car', () => {
    const specification = new Specification(
      {
        name: 'Some testing',
        description: 'test a description',
      },
      new SpecificationId('c14e9269-d000-441e-b2fb-aae18ef6d7af'),
    );

    const car = new Car({
      name: 'Some testing',
      description: 'test a description',
      dailyRate: 75,
      available: false,
      licensePlate: '123-AAAs',
      fineAmount: 150,
      brand: 'mist',
      categorId: 'c14e9269-d000-441e-b2fb-aae18ef6d7af',
      specifications: [specification],
    });
    const props = omit(car.props, 'created_at');
    //expect(user.validate).toHaveBeenCalled();
    expect(props).toStrictEqual({
      name: 'Some testing',
      description: 'test a description',
      dailyRate: 75,
      available: false,
      licensePlate: '123-AAAs',
      fineAmount: 150,
      brand: 'mist',
      categorId: 'c14e9269-d000-441e-b2fb-aae18ef6d7af',
      specifications: [specification],
    });
    expect(car.props.created_at).toBeInstanceOf(Date);
  });
});
