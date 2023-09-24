import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AuthUserUseCase } from '../../../application';

export class AuthUserDto implements AuthUserUseCase.Input {
  @ApiProperty({
    type: 'string',
    example: 'foobar@provider.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: 'string',
    example: 'foobar@123',
  })
  @IsString()
  @IsOptional()
  password: string;
}
