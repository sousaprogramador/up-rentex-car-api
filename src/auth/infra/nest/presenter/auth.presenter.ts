import { Transform } from 'class-transformer';
import { AuthOutput } from '../../../application';

export class AuthPresenter {
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
  access_token: string;

  constructor(output: AuthOutput) {
    this.id = output.user.id;
    this.name = output.user.name;
    this.email = output.user.email;
    this.avatar = output.user.avatar;
    this.driver_licenses = output.user.driver_licenses;
    this.is_active = output.user.is_active;
    this.created_at = output.user.created_at;
    this.access_token = output.access_token;
  }
}
