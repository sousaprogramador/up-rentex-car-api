import { SpecificationModel } from './specification.model';
import { Specification, SpecificationId } from '../../../domain/entities';
import {
  EntityValidationError,
  LoadEntityError,
} from '../../../../@seedwork/domain';

export class SpecificationModelMapper {
  static toEntity(model: SpecificationModel) {
    const { id, ...otherData } = model.toJSON();
    try {
      return new Specification(otherData, new SpecificationId(id));
    } catch (e) {
      if (e instanceof EntityValidationError) {
        throw new LoadEntityError(e.error);
      }

      throw e;
    }
  }
}
