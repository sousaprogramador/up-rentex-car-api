import { Transform } from 'class-transformer';
import {
  SpecificationOutput,
  ListSpecificationsUseCase,
} from '../../../application';
import { CollectionPresenter } from '../../../../@seedwork/infra/nest/presenters/collection.presenter';

export class SpecificationPresenter {
  id: string;
  name: string;
  description: string;
  @Transform(({ value }: { value: Date }) => {
    return value.toISOString().slice(0, 19) + '.000Z';
  })
  created_at: Date;

  constructor(output: SpecificationOutput) {
    this.id = output.id;
    this.name = output.name;
    this.description = output.description;
    this.created_at = output.created_at;
  }
}

export class SpecificationCollectionPresenter extends CollectionPresenter {
  data: SpecificationPresenter[];

  constructor(output: ListSpecificationsUseCase.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((item) => new SpecificationPresenter(item));
  }
}
