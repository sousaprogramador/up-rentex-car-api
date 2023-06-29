import { literal, Op } from 'sequelize';
import { UserModel } from './user.model';
import { UserRepository as UserRepositoryContract } from '../../../domain/repository/user.repository';
import { User, UserId } from '../../../domain/entities';
import { SortDirection } from '../../../../@seedwork/domain';
import {
  EntityValidationError,
  LoadEntityError,
  NotFoundError,
} from '../../../../@seedwork/domain';

export class UserSequelizeRepository
  implements UserRepositoryContract.Repository
{
  sortableFields: string[] = ['name', 'created_at'];
  orderBy = {
    mysql: {
      name: (sort_dir: SortDirection) => literal(`binary name ${sort_dir}`),
    },
  };
  constructor(private userModel: typeof UserModel) {}

  async insert(entity: User): Promise<void> {
    await this.userModel.create(entity.toJSON());
  }

  async bulkInsert(entities: User[]): Promise<void> {
    await this.userModel.bulkCreate(entities.map((e) => e.toJSON()));
  }

  async findById(id: string | UserId): Promise<User> {
    const _id = `${id}`;
    const model = await this._get(_id);
    return UserModelMapper.toEntity(model);
  }

  async findAll(): Promise<User[]> {
    const models = await this.userModel.findAll();
    return models.map((m) => UserModelMapper.toEntity(m));
  }

  async update(entity: User): Promise<void> {
    await this._get(entity.id);
    await this.userModel.update(entity.toJSON(), {
      where: { id: entity.id },
    });
  }
  async delete(id: string | UserId): Promise<void> {
    const _id = `${id}`;
    await this._get(_id);
    this.userModel.destroy({ where: { id: _id } });
  }

  private async _get(id: string): Promise<UserModel> {
    return this.userModel.findByPk(id, {
      rejectOnEmpty: new NotFoundError(`Entity Not Found using ID ${id}`),
    });
  }

  async search(
    props: UserRepositoryContract.SearchParams,
  ): Promise<UserRepositoryContract.SearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;

    const where = {};

    if (props.filter && (props.filter.name || props.filter.email)) {
      if (props.filter.name) {
        where['name'] = { [Op.like]: `%${props.filter.name}%` };
      }

      if (props.filter.email) {
        where['email'] = { [Op.like]: `%${props.filter.email}%` };
      }
    }

    const { rows: models, count } = await this.userModel.findAndCountAll({
      where,
      ...(props.sort && this.sortableFields.includes(props.sort)
        ? { order: this.formatSort(props.sort, props.sort_dir) }
        : { order: [['created_at', 'DESC']] }),
      offset,
      limit,
    });

    return new UserRepositoryContract.SearchResult({
      items: models.map((m) => UserModelMapper.toEntity(m)),
      current_page: props.page,
      per_page: props.per_page,
      total: count,
      filter: props.filter,
      sort: props.sort,
      sort_dir: props.sort_dir,
    });
  }

  private formatSort(sort: string, sort_dir: SortDirection) {
    const dialect = this.userModel.sequelize.getDialect();
    if (this.orderBy[dialect] && this.orderBy[dialect][sort]) {
      return this.orderBy[dialect][sort](sort_dir);
    }
    return [[sort, sort_dir]];
  }
}

export class UserModelMapper {
  static toEntity(model: UserModel) {
    const { id, ...otherData } = model.toJSON();
    try {
      return new User(
        {
          ...otherData,
        },
        new UserId(id),
      );
    } catch (e) {
      if (e instanceof EntityValidationError) {
        throw new LoadEntityError(e.error);
      }
      throw e;
    }
  }
}
