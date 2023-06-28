import { Model } from 'sequelize-typescript';
export declare class SequelizeModelFactory<ModelClass extends Model, ModelProps = any> {
    private model;
    private defaultFactoryProps;
    private _count;
    constructor(model: any, defaultFactoryProps: () => ModelProps);
    count(count: number): this;
    create(data?: ModelProps): Promise<ModelClass>;
    make(data?: ModelProps): ModelClass;
    bulkCreate(factoryProps?: (index: number) => ModelProps): Promise<ModelClass[]>;
    bulkMake(factoryProps?: (index: number) => ModelProps): ModelClass[];
}
