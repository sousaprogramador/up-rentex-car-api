import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import ClassValidatorFields from '../../../@seedwork/domain/validators/class-validator-fields';
import { UserProperties } from '../entities/user';

export class UserRules {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  password: string;

  @IsString()
  avatar?: string | null;

  @IsString()
  @IsNotEmpty()
  driver_licenses: string;

  @IsBoolean()
  is_active?: boolean;

  @IsDate()
  created_at?: Date;

  constructor(data: UserProperties) {
    Object.assign(this, data);
  }
}

export class UserValidator extends ClassValidatorFields<UserRules> {
  validate(data: UserProperties): boolean {
    return super.validate(new UserRules(data ?? ({} as any)));
  }
}

export class UserValidatorFactory {
  static create() {
    return new UserValidator();
  }
}

export default UserValidatorFactory;
