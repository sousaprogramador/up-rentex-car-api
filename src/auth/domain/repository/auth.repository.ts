import { User } from '../../../user/domain';

export interface AuthRepositoryInterface {
  findByEmail(email: string): Promise<User>;
}
