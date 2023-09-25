import { Specification } from '../../domain/entities';

export type SpecificationOutput = {
  id: string;
  name: string;
  description: string;
  created_at?: Date;
};

export class SpecificationOutputMapper {
  static toOutput(entity: Specification): SpecificationOutput {
    return entity.toJSON();
  }
}
