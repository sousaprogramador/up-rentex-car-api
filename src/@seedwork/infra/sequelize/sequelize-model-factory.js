"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeModelFactory = void 0;
class SequelizeModelFactory {
    constructor(model, defaultFactoryProps) {
        this.model = model;
        this.defaultFactoryProps = defaultFactoryProps;
        this._count = 1;
    }
    count(count) {
        this._count = count;
        return this;
    }
    async create(data) {
        return this.model.create(data ? data : this.defaultFactoryProps());
    }
    make(data) {
        return this.model.build(data ? data : this.defaultFactoryProps());
    }
    async bulkCreate(factoryProps) {
        const data = new Array(this._count)
            .fill(factoryProps ? factoryProps : this.defaultFactoryProps)
            .map((factory, index) => factory(index));
        return this.model.bulkCreate(data);
    }
    bulkMake(factoryProps) {
        const data = new Array(this._count)
            .fill(factoryProps ? factoryProps : this.defaultFactoryProps)
            .map((factory, index) => factory(index));
        return this.model.bulkBuild(data);
    }
}
exports.SequelizeModelFactory = SequelizeModelFactory;
