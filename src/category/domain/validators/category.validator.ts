import {
  IsDate,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
} from 'class-validator';
import ClassValidatorFields from '../../../@seedwork/domain/validators/class-validator-fields';
import { CategoryProperties } from '../entities/category';

export class CategoryRules {
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

  constructor(data: CategoryProperties) {
    Object.assign(this, data);
  }
}

export class CategoryValidator extends ClassValidatorFields<CategoryRules> {
  validate(data: CategoryProperties): boolean {
    return super.validate(new CategoryRules(data ?? ({} as any)));
  }
}

export class CategoryValidatorFactory {
  static create() {
    return new CategoryValidator();
  }
}

export default CategoryValidatorFactory;
