import { FieldsErrors } from './src/@seedwork/domain/validators/validator-fields-interface';

declare global {
  namespace jest {
    interface Matchers<R> {
      containsErrorMessages: (expected: FieldsErrors) => R;
    }
  }
}
