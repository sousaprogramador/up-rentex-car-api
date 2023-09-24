import { Transform } from 'class-transformer';
import { CategoryOutput, ListCategoriesUseCase } from '../../../application';
import { CollectionPresenter } from '../../../../@seedwork/infra/nest/presenters/collection.presenter';

export class CategoryPresenter {
  id: string;
  name: string;
  description: string;
  @Transform(({ value }: { value: Date }) => {
    return value.toISOString().slice(0, 19) + '.000Z';
  })
  created_at: Date;

  constructor(output: CategoryOutput) {
    this.id = output.id;
    this.name = output.name;
    this.description = output.description;
    this.created_at = output.created_at;
  }
}

export class CategoryCollectionPresenter extends CollectionPresenter {
  data: CategoryPresenter[];

  constructor(output: ListCategoriesUseCase.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((item) => new CategoryPresenter(item));
  }
}
