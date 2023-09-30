import { CarModel } from './car.model';
import { Car, CarId } from '../../../domain/entities';
import {
  EntityValidationError,
  LoadEntityError,
} from '../../../../@seedwork/domain';

export class CarModelMapper {
  static toEntity(model: CarModel) {
    const { id, ...otherData } = model.toJSON();
    try {
      return new Car(otherData, new CarId(id));
    } catch (e) {
      if (e instanceof EntityValidationError) {
        throw new LoadEntityError(e.error);
      }

      throw e;
    }
  }
}
