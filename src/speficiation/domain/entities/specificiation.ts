import UniqueEntityId from '../../../@seedwork/domain/value-objects/unique-entity-id.vo';
import AggregateRoot from '../../../@seedwork/domain/entity/aggregate-root';
import { EntityValidationError } from '../../../@seedwork/domain';
import { SpecificationFakeBuilder } from './specification-fake-builder';
import { SpecificationValidatorFactory } from '../validators';

export type SpecificationProperties = {
  name: string;
  description: string;
  created_at?: Date;
};

export type SpecificationPropsJson = Required<
  { id: string } & SpecificationProperties
>;

export class SpecificationId extends UniqueEntityId {}

export class Specification extends AggregateRoot<
  SpecificationId,
  SpecificationProperties,
  SpecificationPropsJson
> {
  constructor(
    public readonly props: SpecificationProperties,
    entityId?: SpecificationId,
  ) {
    super(props, entityId ?? new SpecificationId());
    Specification.validate(props);
    this.name = this.props.name;
    this.description = this.props.description;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  update(data: SpecificationProperties): void {
    Specification.validate(data);
    this.name = data.name ?? this.name;
    this.description = data.description ?? this.description;
  }

  static validate(props: SpecificationProperties) {
    const validator = SpecificationValidatorFactory.create();
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
    return SpecificationFakeBuilder;
  }

  toJSON(): Required<{ id: string } & SpecificationProperties> {
    return {
      id: this.id.toString(),
      name: this.name,
      description: this.description,
      created_at: this.created_at,
    };
  }
}
