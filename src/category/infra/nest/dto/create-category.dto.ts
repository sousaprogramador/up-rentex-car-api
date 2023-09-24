import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCategoryUseCase } from '../../../application/use-cases';

export class CreateCategoryDto implements CreateCategoryUseCase.Input {
  @ApiProperty({
    type: 'string',
    example: 'foo category',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'string',
    example: 'description category',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
