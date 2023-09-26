import { UpdateSpecificationUseCase } from '../../../application';
import { CreateSpecificationDto } from './create-specification.dto';

export class UpdateSpecificationDto
  extends CreateSpecificationDto
  implements Omit<UpdateSpecificationUseCase.Input, 'id'> {}
