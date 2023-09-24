import { compare } from 'bcryptjs';
import { CryptographyInterface } from '../../domain/cryptography';

export class Cryptography implements CryptographyInterface {
  async compare(hashValue: string, value: string): Promise<boolean> {
    return compare(hashValue, value);
  }
}
