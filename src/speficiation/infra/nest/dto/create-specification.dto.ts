import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateSpecificationUseCase } from '../../../application/use-cases';

export class CreateSpecificationDto
  implements CreateSpecificationUseCase.Input
{
  @ApiProperty({
    type: 'string',
    example: 'name specification',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'string',
    example: 'description specification',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
