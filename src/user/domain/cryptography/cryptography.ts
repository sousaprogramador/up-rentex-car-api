export interface CryptographyInterface {
  hash(value: string): Promise<string>;
  compare(hashValue: string, value: string): Promise<boolean>;
}
