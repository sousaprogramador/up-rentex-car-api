import { setupSequelize } from '../../../../../@seedwork/infra';
import { DataType } from 'sequelize-typescript';
import { UserModel } from '../user.model';

describe('UserModel Unit Tests', () => {
  setupSequelize({ models: [UserModel] });

  test('mapping props', () => {
    const attributesMap = UserModel.getAttributes();
    const attributes = Object.keys(UserModel.getAttributes());

    expect(attributes).toStrictEqual([
      'id',
      'name',
      'email',
      'password',
      'avatar',
      'driver_licenses',
      'is_active',
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

    const emailAttr = attributesMap.email;
    expect(emailAttr).toMatchObject({
      field: 'email',
      fieldName: 'email',
      allowNull: false,
      type: DataType.STRING(255),
    });

    const passwordAttr = attributesMap.password;
    expect(passwordAttr).toMatchObject({
      field: 'password',
      fieldName: 'password',
      allowNull: false,
      type: DataType.STRING(255),
    });

    const avatarAttr = attributesMap.avatar;
    expect(avatarAttr).toMatchObject({
      field: 'avatar',
      fieldName: 'avatar',
      allowNull: true,
      type: DataType.STRING(255),
    });

    const driveLicenseAttr = attributesMap.driver_licenses;
    expect(driveLicenseAttr).toMatchObject({
      field: 'driver_licenses',
      fieldName: 'driver_licenses',
      allowNull: false,
      type: DataType.STRING(255),
    });

    const isActiveAttr = attributesMap.is_active;
    expect(isActiveAttr).toMatchObject({
      field: 'is_active',
      fieldName: 'is_active',
      allowNull: false,
      type: DataType.BOOLEAN(),
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
