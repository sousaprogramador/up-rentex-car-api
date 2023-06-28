import UniqueEntityId from '../../../@seedwork/domain/value-objects/unique-entity-id.vo';
import AggregateRoot from '../../../@seedwork/domain/entity/aggregate-root';

export type UserProperties = {
  name: string;
  email: string;
  password: string;
  avatar?: string | null;
  driver_licenses: string;
  is_active?: boolean;
  created_at?: Date;
};

export type UserPropsJson = Required<
  { id: string } & Omit<UserProperties, 'password'>
>;

export class UserId extends UniqueEntityId {}

export class User extends AggregateRoot<UserId, UserProperties, UserPropsJson> {
  constructor(public readonly props: UserProperties, entityId?: UserId) {
    super(props, entityId ?? new UserId());
    this.name = this.props.name;
    this.email = this.props.email;
    this.password = this.props.password;
    this.avatar = this.props.avatar ?? null;
    this.driver_licenses = this.props.driver_licenses;
    this.props.is_active = this.props.is_active ?? true;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  activate() {
    this.props.is_active = true;
  }

  deactivate() {
    this.props.is_active = false;
  }

  get name() {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  get email() {
    return this.props.email;
  }

  private set email(value: string) {
    this.props.email = value;
  }

  get password() {
    return this.props.password;
  }

  private set password(value: string) {
    this.props.password = value;
  }

  get avatar() {
    return this.props.avatar;
  }

  private set avatar(value: string) {
    this.props.avatar = value;
  }

  get driver_licenses() {
    return this.props.driver_licenses;
  }

  private set driver_licenses(value: string) {
    this.props.driver_licenses = value;
  }

  get is_active() {
    return this.props.is_active;
  }

  private set is_active(value: boolean) {
    this.props.is_active = value ?? true;
  }

  get created_at() {
    return this.props.created_at;
  }

  toJSON(): Required<{ id: string } & Omit<UserProperties, 'password'>> {
    return {
      id: this.id.toString(),
      name: this.name,
      email: this.email,
      avatar: this.avatar,
      driver_licenses: this.driver_licenses,
      is_active: this.is_active,
      created_at: this.created_at,
    };
  }
}
