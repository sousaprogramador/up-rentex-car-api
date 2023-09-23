import { UserModel } from './user.model';
import { User, UserId } from '../../../domain/entities';
import {
  EntityValidationError,
  LoadEntityError,
} from '../../../../@seedwork/domain';

export class UserModelMapper {
  static toEntity(model: UserModel) {
    const { id, ...otherData } = model.toJSON();
    try {
      return new User(otherData, new UserId(id));
    } catch (e) {
      if (e instanceof EntityValidationError) {
        throw new LoadEntityError(e.error);
      }

      throw e;
    }
  }
}
