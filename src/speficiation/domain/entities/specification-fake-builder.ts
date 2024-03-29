import { Specification, SpecificationId } from './specificiation';
import { Chance } from 'chance';

type PropOrFactory<T> = T | ((index: number) => T);

export class SpecificationFakeBuilder<TBuild = any> {
  private chance: Chance.Chance;
  private countObjs: number;

  private constructor(countObjs = 1) {
    this.countObjs = countObjs;
    this.chance = Chance();
  }

  private _entity_id = undefined;
  private _name: PropOrFactory<string> = (_index) => this.chance.word();
  private _description: PropOrFactory<string> = (_index) => this.chance.word();

  private _created_at = undefined;

  static aSpecification() {
    return new SpecificationFakeBuilder<Specification>();
  }

  static theSpecifications(countObjs: number) {
    return new SpecificationFakeBuilder<Specification[]>(countObjs);
  }

  withEntityId(valueOrFactory: PropOrFactory<SpecificationId>) {
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

  build(): TBuild {
    const specifications = new Array(this.countObjs).fill(undefined).map(
      (_, index) =>
        new Specification(
          {
            name: this.callFactory(this._name, index),
            description: this.callFactory(this._description, index),
            ...(this._created_at && {
              created_at: this.callFactory(this._created_at, index),
            }),
          },
          !this._entity_id
            ? undefined
            : this.callFactory(this._entity_id, index),
        ),
    );
    return this.countObjs === 1 ? (specifications[0] as any) : specifications;
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
