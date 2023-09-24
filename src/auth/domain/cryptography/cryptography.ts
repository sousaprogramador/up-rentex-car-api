export interface CryptographyInterface {
  compare(hashValue: string, value: string): Promise<boolean>;
}
