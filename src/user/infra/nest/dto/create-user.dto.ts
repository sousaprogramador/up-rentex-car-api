import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UsersConstants } from '../user.constaints';
import { CreateUserUseCase } from '../../../application/useCases';

export class CreateUserDto implements CreateUserUseCase.Input {
  @ApiProperty({
    type: 'string',
    example: UsersConstants.NAME,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'string',
    example: UsersConstants.EMAIL,
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: 'string',
    example: UsersConstants.PASSWORD,
  })
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty({
    type: 'string',
    example: UsersConstants.AVATAR,
  })
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiProperty({
    type: 'string',
    example: UsersConstants.DRIVER_LICENSES,
  })
  @IsString()
  @IsOptional()
  driver_licenses: string;

  @ApiProperty({
    type: 'string',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
