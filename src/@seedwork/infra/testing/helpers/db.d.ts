import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
export declare function setupSequelize(options?: SequelizeOptions): {
    readonly sequelize: Sequelize;
};
