import { hash, compare } from 'bcrypt';
import { CryptographyInterface } from 'src/user/domain';

export class Cryptography implements CryptographyInterface {
  async hash(value: string): Promise<string> {
    return await hash(value, 8);
  }

  compare(hashValue: string, value: string): Promise<boolean> {
    return compare(hashValue, value);
  }
}
