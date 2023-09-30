import UniqueEntityId from '../../../@seedwork/domain/value-objects/unique-entity-id.vo';
import AggregateRoot from '../../../@seedwork/domain/entity/aggregate-root';
import { EntityValidationError } from '../../../@seedwork/domain';
import { CarFakeBuilder } from './car-fake-builder';
import { CarValidatorFactory } from '../validators';
import { Specification } from '../../../speficiation/domain';

export type CarProperties = {
  name: string;
  description: string;
  dailyRate: number;
  available: boolean;
  licensePlate: string;
  fineAmount: number;
  brand: string;
  categorId: string;
  specifications?: Specification[];
  created_at?: Date;
};

export type CarPropsJson = Required<{ id: string } & CarProperties>;

export class CarId extends UniqueEntityId {}

export class Car extends AggregateRoot<CarId, CarProperties, CarPropsJson> {
  constructor(public readonly props: CarProperties, entityId?: CarId) {
    super(props, entityId ?? new CarId());
    Car.validate(props);
    this.name = this.props.name;
    this.description = this.props.description;
    this.dailyRate = this.props.dailyRate;
    this.available = this.props.available;
    this.licensePlate = this.props.licensePlate;
    this.fineAmount = this.props.fineAmount;
    this.brand = this.props.brand;
    this.categorId = this.props.categorId;
    this.specifications = this.props.specifications;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  static validate(props: CarProperties) {
    const validator = CarValidatorFactory.create();
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

  get dailyRate() {
    return this.props.dailyRate;
  }

  private set dailyRate(value: number) {
    this.props.dailyRate = value;
  }

  get available() {
    return this.props.available;
  }

  private set available(value: boolean) {
    this.props.available = value;
  }

  get licensePlate() {
    return this.props.licensePlate;
  }

  private set licensePlate(value: string) {
    this.props.licensePlate = value;
  }

  get fineAmount() {
    return this.props.fineAmount;
  }

  private set fineAmount(value: number) {
    this.props.fineAmount = value;
  }

  get brand() {
    return this.props.brand;
  }

  private set brand(value: string) {
    this.props.brand = value;
  }

  get categorId() {
    return this.props.categorId;
  }

  private set categorId(value: string) {
    this.props.categorId = value;
  }

  get specifications() {
    return this.props.specifications;
  }

  private set specifications(value: Specification[]) {
    this.props.specifications = value;
  }

  get created_at() {
    return this.props.created_at;
  }

  static fake() {
    return CarFakeBuilder;
  }

  toJSON(): Required<{ id: string } & CarProperties> {
    return {
      id: this.id.toString(),
      name: this.props.name,
      description: this.props.description,
      dailyRate: this.props.dailyRate,
      available: this.props.available,
      licensePlate: this.props.licensePlate,
      fineAmount: this.props.fineAmount,
      brand: this.props.brand,
      categorId: this.props.categorId,
      specifications: this.props.specifications,
      created_at: this.created_at,
    };
  }
}
