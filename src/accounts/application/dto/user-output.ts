import { User } from '../../domain/entities';

export type UserOutput = {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  driver_licenses: string;
  is_active?: boolean;
  created_at?: Date;
};

export class UserOutputMapper {
  static toOutput(entity: User): UserOutput {
    return entity.toJSON();
  }
}
