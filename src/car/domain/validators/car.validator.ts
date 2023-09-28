import {
  IsDate,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsArray,
} from 'class-validator';
import ClassValidatorFields from '../../../@seedwork/domain/validators/class-validator-fields';
import { CarProperties } from '../entities/car';

export class CarRules {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(255)
  description: string;

  @IsNumber()
  dailyRate: number;

  @IsBoolean()
  available: boolean;

  @IsString()
  licensePlate: string;

  @IsNumber()
  fineAmount: number;

  @IsString()
  brand: string;

  @IsString()
  categorId: string;

  @IsArray()
  specifications: string[];

  @IsDate()
  @IsOptional()
  created_at?: Date;

  constructor(data: CarProperties) {
    Object.assign(this, data);
  }
}

export class CarValidator extends ClassValidatorFields<CarRules> {
  validate(data: CarProperties): boolean {
    return super.validate(new CarRules(data ?? ({} as any)));
  }
}

export class CarValidatorFactory {
  static create() {
    return new CarValidator();
  }
}

export default CarValidatorFactory;
