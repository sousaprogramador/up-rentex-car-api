import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateUserUseCase } from '../../../application/useCases';

export class CreateAccountDto implements CreateUserUseCase.Input {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsString()
  @IsOptional()
  driver_licenses: string;

  @IsBoolean()
  @IsOptional()
  is_active: boolean;
}
