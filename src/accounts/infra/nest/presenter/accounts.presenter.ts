import { Transform } from 'class-transformer';
import { UserOutput, ListUsersUseCase } from '../../../application';
import { CollectionPresenter } from '../../../../@seedwork/infra/nest/presenters/collection.presenter';
export class UserPresenter {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  driver_licenses: string;
  is_active?: boolean;
  @Transform(({ value }: { value: Date }) => {
    return value.toISOString().slice(0, 19) + '.000Z';
  })
  created_at: Date;

  constructor(output: UserOutput) {
    this.id = output.id;
    this.name = output.name;
    this.email = output.email;
    this.avatar = output.avatar;
    this.driver_licenses = output.driver_licenses;
    this.is_active = output.is_active;
    this.created_at = output.created_at;
  }
}

export class UserCollectionPresenter extends CollectionPresenter {
  data: UserPresenter[];

  constructor(output: ListUsersUseCase.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((item) => new UserPresenter(item));
  }
}
