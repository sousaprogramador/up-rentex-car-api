import { getRepository, Repository } from "typeorm";
import { Specification } from "../entities/Specification";
import { ISpecificationsRepository,ICreateSpecificationDTO } from "@modules/cars/repositories/ISpecificationsRepository";

class SpeficicationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor(){
    this.repository = getRepository(Specification);
  }

  async create({ name,description }:ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({ name,description });
    return await this.repository.save(specification);
  }

  async findByName(name:string):Promise<Specification>{
    const category = await this.repository.findOne({where:name});
    return category;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findByIds(ids);

    return specifications;
  }

}

export { SpeficicationsRepository }
