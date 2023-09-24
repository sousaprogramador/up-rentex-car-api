import { CategoryModel } from './category.model';
import { Category, CategoryId } from '../../../domain/entities';
import {
  EntityValidationError,
  LoadEntityError,
} from '../../../../@seedwork/domain';

export class CategoryModelMapper {
  static toEntity(model: CategoryModel) {
    const { id, ...otherData } = model.toJSON();
    try {
      return new Category(otherData, new CategoryId(id));
    } catch (e) {
      if (e instanceof EntityValidationError) {
        throw new LoadEntityError(e.error);
      }

      throw e;
    }
  }
}
