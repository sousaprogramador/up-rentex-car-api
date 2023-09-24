import { hash } from 'bcrypt';
import { CryptographyInterface } from '../../domain/cryptography';

export class Cryptography implements CryptographyInterface {
  async hash(value: string): Promise<string> {
    return await hash(value, 8);
  }
}
