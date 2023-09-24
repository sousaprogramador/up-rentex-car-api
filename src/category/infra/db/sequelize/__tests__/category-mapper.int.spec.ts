import { CategoryModel } from '../category.model';
import { CategoryModelMapper } from '../cateogry.model.mapper';
import { LoadEntityError } from '../../../../../@seedwork/domain';
import { Category, CategoryId } from '../../../../domain/entities';
import { setupSequelize } from '../../../../../@seedwork/infra';

describe('CategoryModelMapper Unit Tests', () => {
  setupSequelize({ models: [CategoryModel] });

  it('should throws error when cast member is invalid', () => {
    const model = CategoryModel.build({
      id: '9366b7dc-2d71-4799-b91c-c64adb205104',
    });
    try {
      CategoryModelMapper.toEntity(model);
      fail('The user is valid, but it needs throws a LoadEntityError');
    } catch (e) {
      expect(e).toBeInstanceOf(LoadEntityError);
      expect(e.error).toMatchObject({
        name: [
          'name should not be empty',
          'name must be shorter than or equal to 255 characters',
          'name must be a string',
        ],
        description: [
          'description must be shorter than or equal to 255 characters',
          'description must be a string',
        ],
      });
    }
  });

  it('should throw a generic error', () => {
    const error = new Error('Generic Error');
    const spyValidate = jest
      .spyOn(Category, 'validate')
      .mockImplementation(() => {
        throw error;
      });
    const model = CategoryModel.build({
      id: '9366b7dc-2d71-4799-b91c-c64adb205104',
    });
    expect(() => CategoryModelMapper.toEntity(model)).toThrow(error);
    expect(spyValidate).toHaveBeenCalled();
    spyValidate.mockRestore();
  });

  it('should convert a category model to a category entity', () => {
    const created_at = new Date();
    const model = CategoryModel.build({
      id: '5490020a-e866-4229-9adc-aa44b83234c4',
      name: 'Some testing',
      description: 'some a description',
      created_at,
    });
    const entity = CategoryModelMapper.toEntity(model);
    expect(entity.toJSON()).toEqual(
      new Category(
        {
          name: 'Some testing',
          description: 'some a description',
          created_at,
        },
        new CategoryId('5490020a-e866-4229-9adc-aa44b83234c4'),
      ).toJSON(),
    );
  });
});
