import { Specification } from '../../domain/entities';
import { SpecificationOutputMapper } from './specification-output';

describe('SpecificationOutputMapper Unit Tests', () => {
  it('should convert a Specification in output', () => {
    const created_at = new Date();
    const entity = new Specification({
      name: 'Some testing',
      description: 'same description',
      created_at: created_at,
    });
    const spyToJSON = jest.spyOn(entity, 'toJSON');
    const output = SpecificationOutputMapper.toOutput(entity);
    expect(spyToJSON).toHaveBeenCalled();

    expect(output).toStrictEqual({
      id: entity.id,
      name: 'Some testing',
      description: 'same description',
      created_at: created_at,
    });
  });
});
