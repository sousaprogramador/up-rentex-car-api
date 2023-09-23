import { AuthRepositoryInterface } from 'src/auth/domain/repository/auth.repository';
import { UserModel, UserModelMapper } from '../../../../user/infra/db';
import { User } from '../../../../user/domain';
import { NotFoundError } from '../../../../@seedwork/domain';

export class AuthSequelizeRepository implements AuthRepositoryInterface {
  constructor(private userModel: typeof UserModel) {}

  async findByEmail(email: string): Promise<User> {
    const model = await this.userModel.findOne({ where: { email } });
    if (!model) {
      throw new NotFoundError(`Entity not found using email ${email}`);
    }
    return UserModelMapper.toEntity(model);
  }
}
