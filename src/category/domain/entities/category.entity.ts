import UniqueEntityId from '../../../@seedwork/domain/value-objects/unique-entity-id.vo';
import AggregateRoot from '../../../@seedwork/domain/entity/aggregate-root';
import { EntityValidationError } from '../../../@seedwork/domain';

export type CategoryProperties = {
  name: string;
  description: string;
  created_at?: Date;
};

export type CategoryPropsJson = Required<{ id: string } & CategoryProperties>;

export class CategoryId extends UniqueEntityId {}

export class Category extends AggregateRoot<
  CategoryId,
  CategoryProperties,
  CategoryPropsJson
> {
  constructor(
    public readonly props: CategoryProperties,
    entityId?: CategoryId,
  ) {
    super(props, entityId ?? new CategoryId());
    Category.validate(props);
    this.name = this.props.name;
    this.description = this.props.description;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  update(data: CategoryProperties): void {
    Category.validate(data);
    this.name = data.name;
    this.description = data.description;
  }

  static validate(props: CategoryProperties) {
    const validator = null;
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  get name() {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  get description() {
    return this.props.description;
  }

  private set description(value: string) {
    this.props.description = value;
  }

  get created_at() {
    return this.props.created_at;
  }

  static fake() {
    return null;
  }

  toJSON(): Required<{ id: string } & CategoryProperties> {
    return {
      id: this.id.toString(),
      name: this.name,
      description: this.description,
      created_at: this.created_at,
    };
  }
}
