import {
  IsDate,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
} from 'class-validator';
import ClassValidatorFields from '../../../@seedwork/domain/validators/class-validator-fields';
import { SpecificationProperties } from '../entities/specificiation';

export class SpecificationRules {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(255)
  description: string;

  @IsDate()
  @IsOptional()
  created_at?: Date;

  constructor(data: SpecificationProperties) {
    Object.assign(this, data);
  }
}

export class SpecificationValidator extends ClassValidatorFields<SpecificationRules> {
  validate(data: SpecificationProperties): boolean {
    return super.validate(new SpecificationRules(data ?? ({} as any)));
  }
}

export class SpecificationValidatorFactory {
  static create() {
    return new SpecificationValidator();
  }
}

export default SpecificationValidatorFactory;
