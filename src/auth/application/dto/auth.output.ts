import { User } from '../../../user/domain';

export type AuthOutput = {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string | null;
    driver_licenses: string;
    is_active?: boolean;
    created_at?: Date;
  };
  access_token: string;
};

export class AuthOutputMapper {
  static toOutput(entity: User, token: string): AuthOutput {
    return {
      user: entity.toJSON(),
      access_token: token,
    };
  }
}
