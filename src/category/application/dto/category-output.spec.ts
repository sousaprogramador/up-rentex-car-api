import { Category } from '../../domain/entities';
import { CategoryOutputMapper } from './category-output';

describe('CategoryOutputMapper Unit Tests', () => {
  it('should convert a Category in output', () => {
    const created_at = new Date();
    const entity = new Category({
      name: 'Some testing',
      description: 'same description',
      created_at: created_at,
    });
    const spyToJSON = jest.spyOn(entity, 'toJSON');
    const output = CategoryOutputMapper.toOutput(entity);
    expect(spyToJSON).toHaveBeenCalled();
    expect(output).toStrictEqual({
      id: entity.id,
      name: 'Some testing',
      description: 'same description',
      created_at: created_at,
    });
  });
});
