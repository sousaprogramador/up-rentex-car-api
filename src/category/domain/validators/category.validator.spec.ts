import CategoryValidatorFactory from './category.validator';

describe('CategoryValidator Tests', () => {
  let validator: CategoryValidatorFactory;

  beforeEach(() => (validator = CategoryValidatorFactory.create()));

  test('invalidation cases for name field', () => {
    expect({ validator, data: null }).containsErrorMessages({
      name: [
        'name should not be empty',
        'name must be shorter than or equal to 255 characters',
        'name must be a string',
      ],
    });

    expect({ validator, data: { name: null } }).containsErrorMessages({
      name: [
        'name should not be empty',
        'name must be shorter than or equal to 255 characters',
        'name must be a string',
      ],
    });

    expect({ validator, data: { name: '' } }).containsErrorMessages({
      name: ['name should not be empty'],
    });

    expect({ validator, data: { name: 5 as any } }).containsErrorMessages({
      name: [
        'name must be shorter than or equal to 255 characters',
        'name must be a string',
      ],
    });

    expect({
      validator,
      data: { name: 't'.repeat(256) },
    }).containsErrorMessages({
      name: ['name must be shorter than or equal to 255 characters'],
    });
  });

  test('invalidation cases for description field', () => {
    expect({ validator, data: null }).containsErrorMessages({
      description: [
        'description must be shorter than or equal to 255 characters',
        'description must be a string',
      ],
    });

    expect({ validator, data: { description: null } }).containsErrorMessages({
      description: [
        'description must be shorter than or equal to 255 characters',
        'description must be a string',
      ],
    });

    expect({
      validator,
      data: { description: 5 as any },
    }).containsErrorMessages({
      description: [
        'description must be shorter than or equal to 255 characters',
        'description must be a string',
      ],
    });

    expect({
      validator,
      data: { description: 't'.repeat(256) },
    }).containsErrorMessages({
      description: [
        'description must be shorter than or equal to 255 characters',
      ],
    });
  });
});
