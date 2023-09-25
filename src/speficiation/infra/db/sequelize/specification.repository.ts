import { literal, Op } from 'sequelize';
import { SpecificationModel } from './specification.model';
import { SpecificationModelMapper } from './specification.model.mapper';
import { SpecificationRepository as SpecificationRepositoryContract } from '../../../domain/repository';
import { Specification, SpecificationId } from '../../../domain/entities';
import { SortDirection, NotFoundError } from '../../../../@seedwork/domain';

export class SpecificationSequelizeRepository
  implements SpecificationRepositoryContract.Repository
{
  sortableFields: string[] = ['name', 'created_at'];
  orderBy = {
    mysql: {
      name: (sort_dir: SortDirection) => literal(`binary name ${sort_dir}`),
    },
  };
  constructor(private specificationModel: typeof SpecificationModel) {}

  async insert(entity: Specification): Promise<void> {
    await this.specificationModel.create(entity.toJSON());
  }

  async bulkInsert(entities: Specification[]): Promise<void> {
    await this.specificationModel.bulkCreate(entities.map((e) => e.toJSON()));
  }

  async findById(id: string | SpecificationId): Promise<Specification> {
    const _id = `${id}`;
    const model = await this._get(_id);
    return SpecificationModelMapper.toEntity(model);
  }

  async findAll(): Promise<Specification[]> {
    const models = await this.specificationModel.findAll();
    return models.map((m) => SpecificationModelMapper.toEntity(m));
  }

  async update(entity: Specification): Promise<void> {
    await this._get(entity.id);
    await this.specificationModel.update(entity.toJSON(), {
      where: { id: entity.id },
    });
  }
  async delete(id: string | SpecificationId): Promise<void> {
    const _id = `${id}`;
    await this._get(_id);
    this.specificationModel.destroy({ where: { id: _id } });
  }

  private async _get(id: string): Promise<SpecificationModel> {
    return await this.specificationModel.findByPk(id, {
      rejectOnEmpty: new NotFoundError(`Entity Not Found using ID ${id}`),
    });
  }

  async search(
    props: SpecificationRepositoryContract.SearchParams,
  ): Promise<SpecificationRepositoryContract.SearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;

    const where = {};

    if (props.filter && props.filter.name) {
      if (props.filter.name) {
        where['name'] = { [Op.like]: `%${props.filter.name}%` };
      }
    }

    const { rows: models, count } =
      await this.specificationModel.findAndCountAll({
        where,
        ...(props.sort && this.sortableFields.includes(props.sort)
          ? { order: this.formatSort(props.sort, props.sort_dir) }
          : { order: [['created_at', 'DESC']] }),
        offset,
        limit,
      });

    return new SpecificationRepositoryContract.SearchResult({
      items: models.map((m) => SpecificationModelMapper.toEntity(m)),
      current_page: props.page,
      per_page: props.per_page,
      total: count,
      filter: props.filter,
      sort: props.sort,
      sort_dir: props.sort_dir,
    });
  }

  private formatSort(sort: string, sort_dir: SortDirection) {
    const dialect = this.specificationModel.sequelize.getDialect();
    if (this.orderBy[dialect] && this.orderBy[dialect][sort]) {
      return this.orderBy[dialect][sort](sort_dir);
    }
    return [[sort, sort_dir]];
  }
}
