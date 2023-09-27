import { Car, CarId } from './car';
import { Chance } from 'chance';

type PropOrFactory<T> = T | ((index: number) => T);

export class CarFakeBuilder<TBuild = any> {
  private chance: Chance.Chance;
  private countObjs: number;

  private constructor(countObjs = 1) {
    this.countObjs = countObjs;
    this.chance = Chance();
  }

  private _entity_id = undefined;
  private _name: PropOrFactory<string> = (_index) => this.chance.word();
  private _description: PropOrFactory<string> = (_index) => this.chance.word();
  private _dailyRate: PropOrFactory<number> = (_index) => this.chance.integer();
  private _available: true;
  private _licensePlate: PropOrFactory<string> = (_index) => this.chance.word();
  private _fineAmount: PropOrFactory<number> = (_index) =>
    this.chance.integer();
  private _brand: PropOrFactory<string> = (_index) => this.chance.word();
  private _categorId: PropOrFactory<string> = (_index) => this.chance.word();

  private _created_at = undefined;

  static aCar() {
    return new CarFakeBuilder<Car>();
  }

  static theCars(countObjs: number) {
    return new CarFakeBuilder<Car[]>(countObjs);
  }

  withEntityId(valueOrFactory: PropOrFactory<CarId>) {
    this._entity_id = valueOrFactory;
    return this;
  }

  withName(valueOrFactory: PropOrFactory<string>) {
    this._name = valueOrFactory;
    return this;
  }

  withInvalidNameEmpty(value: '' | null | undefined) {
    this._name = value;
    return this;
  }

  withInvalidNameNotAString(value?: any) {
    this._name = value ?? 5;
    return this;
  }

  withInvalidNameTooLong(value?: string) {
    this._name = value ?? this.chance.word({ length: 256 });
    return this;
  }

  withDescription(valueOrFactory: PropOrFactory<string>) {
    this._description = valueOrFactory;
    return this;
  }

  withCreatedAt(valueOrFactory: PropOrFactory<Date>) {
    this._created_at = valueOrFactory;
    return this;
  }

  get entity_id() {
    return this.getValue('entity_id');
  }

  get name() {
    return this.getValue('name');
  }

  get description() {
    return this.getValue('description');
  }

  get dailyRate() {
    return this.getValue('dailyRate');
  }

  get available() {
    return this.getValue('available');
  }

  get licensePlate() {
    return this.getValue('licensePlate');
  }

  get fineAmount() {
    return this.getValue('fineAmount');
  }

  get brand() {
    return this.getValue('brand');
  }

  get categorId() {
    return this.getValue('categorId');
  }

  build(): TBuild {
    const cars = new Array(this.countObjs).fill(undefined).map(
      (_, index) =>
        new Car(
          {
            name: this.callFactory(this._name, index),
            description: this.callFactory(this._description, index),
            dailyRate: this.callFactory(this._dailyRate, index),
            available: this.callFactory(this._available, index),
            licensePlate: this.callFactory(this._licensePlate, index),
            fineAmount: this.callFactory(this._fineAmount, index),
            brand: this.callFactory(this._brand, index),
            categorId: this.callFactory(this._categorId, index),
            ...(this._created_at && {
              created_at: this.callFactory(this._created_at, index),
            }),
          },
          !this._entity_id
            ? undefined
            : this.callFactory(this._entity_id, index),
        ),
    );
    return this.countObjs === 1 ? (cars[0] as any) : cars;
  }

  private getValue(prop) {
    const optional = ['entity_id', 'created_at'];
    const privateProp = `_${prop}`;
    if (!this[privateProp] && optional.includes(prop)) {
      throw new Error(
        `Property ${prop} not have a factory, use 'with' methods`,
      );
    }
    return this.callFactory(this[privateProp], 0);
  }

  private callFactory(factoryOrValue: PropOrFactory<any>, index: number) {
    return typeof factoryOrValue === 'function'
      ? factoryOrValue(index)
      : factoryOrValue;
  }
}
