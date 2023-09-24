import { literal, Op } from 'sequelize';
import { CategoryModel } from './category.model';
import { CategoryModelMapper } from './cateogry.model.mapper';
import { CategoryRepository as CategoryRepositoryContract } from '../../../domain/repository';
import { Category, CategoryId } from '../../../domain/entities';
import { SortDirection, NotFoundError } from '../../../../@seedwork/domain';

export class CategorySequelizeRepository
  implements CategoryRepositoryContract.Repository
{
  sortableFields: string[] = ['name', 'created_at'];
  orderBy = {
    mysql: {
      name: (sort_dir: SortDirection) => literal(`binary name ${sort_dir}`),
    },
  };
  constructor(private categoryModel: typeof CategoryModel) {}

  async insert(entity: Category): Promise<void> {
    await this.categoryModel.create(entity.toJSON());
  }

  async bulkInsert(entities: Category[]): Promise<void> {
    await this.categoryModel.bulkCreate(entities.map((e) => e.toJSON()));
  }

  async findById(id: string | CategoryId): Promise<Category> {
    const _id = `${id}`;
    const model = await this._get(_id);
    return CategoryModelMapper.toEntity(model);
  }

  async findAll(): Promise<Category[]> {
    const models = await this.categoryModel.findAll();
    return models.map((m) => CategoryModelMapper.toEntity(m));
  }

  async update(entity: Category): Promise<void> {
    await this._get(entity.id);
    await this.categoryModel.update(entity.toJSON(), {
      where: { id: entity.id },
    });
  }
  async delete(id: string | CategoryId): Promise<void> {
    const _id = `${id}`;
    await this._get(_id);
    this.categoryModel.destroy({ where: { id: _id } });
  }

  private async _get(id: string): Promise<CategoryModel> {
    return await this.categoryModel.findByPk(id, {
      rejectOnEmpty: new NotFoundError(`Entity Not Found using ID ${id}`),
    });
  }

  async search(
    props: CategoryRepositoryContract.SearchParams,
  ): Promise<CategoryRepositoryContract.SearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;

    const where = {};

    if (props.filter && props.filter.name) {
      if (props.filter.name) {
        where['name'] = { [Op.like]: `%${props.filter.name}%` };
      }
    }

    const { rows: models, count } = await this.categoryModel.findAndCountAll({
      where,
      ...(props.sort && this.sortableFields.includes(props.sort)
        ? { order: this.formatSort(props.sort, props.sort_dir) }
        : { order: [['created_at', 'DESC']] }),
      offset,
      limit,
    });

    return new CategoryRepositoryContract.SearchResult({
      items: models.map((m) => CategoryModelMapper.toEntity(m)),
      current_page: props.page,
      per_page: props.per_page,
      total: count,
      filter: props.filter,
      sort: props.sort,
      sort_dir: props.sort_dir,
    });
  }

  private formatSort(sort: string, sort_dir: SortDirection) {
    const dialect = this.categoryModel.sequelize.getDialect();
    if (this.orderBy[dialect] && this.orderBy[dialect][sort]) {
      return this.orderBy[dialect][sort](sort_dir);
    }
    return [[sort, sort_dir]];
  }
}
