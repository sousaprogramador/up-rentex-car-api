import { DataType } from 'sequelize-typescript';
import { setupSequelize } from '../../../../../@seedwork/infra';
import { SpecificationModel } from '../specification.model';

describe('SpecificationModel Unit Tests', () => {
  setupSequelize({ models: [SpecificationModel] });

  test('mapping props', () => {
    const attributesMap = SpecificationModel.getAttributes();
    const attributes = Object.keys(SpecificationModel.getAttributes());

    expect(attributes).toStrictEqual([
      'id',
      'name',
      'description',
      'created_at',
    ]);

    const idAttr = attributesMap.id;
    expect(idAttr).toMatchObject({
      field: 'id',
      fieldName: 'id',
      primaryKey: true,
      type: DataType.UUID(),
    });

    const nameAttr = attributesMap.name;
    expect(nameAttr).toMatchObject({
      field: 'name',
      fieldName: 'name',
      allowNull: false,
      type: DataType.STRING(255),
    });

    const descriptionAttr = attributesMap.description;
    expect(descriptionAttr).toMatchObject({
      field: 'description',
      fieldName: 'description',
      allowNull: false,
      type: DataType.STRING(255),
    });

    const createdAtAttr = attributesMap.created_at;
    expect(createdAtAttr).toMatchObject({
      field: 'created_at',
      fieldName: 'created_at',
      allowNull: false,
      type: DataType.DATE(6),
    });
  });
});
