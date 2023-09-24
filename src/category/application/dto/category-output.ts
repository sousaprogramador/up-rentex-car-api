import { Category } from '../../domain/entities';

export type CategoryOutput = {
  id: string;
  name: string;
  description: string;
  created_at?: Date;
};

export class CategoryOutputMapper {
  static toOutput(entity: Category): CategoryOutput {
    return entity.toJSON();
  }
}
