import { getRepository, Repository } from "typeorm";
import { Specification } from "../entities/Specification";
import { ISpecificationsRepository , ICreateSpecificationDTO } from "../ISpecificationsRepository";

class SpeficicationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor(){
    this.repository = getRepository(Specification);
  }

  async create({ name,description }:ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({ name,description });
    await this.repository.save(specification);
  }

  async list(): Promise<Specification[]>{
    return await this.repository.find();
  }

  async findByName(name:string):Promise<Specification>{
    const category = await this.repository.findOne({where:name});
    return category;
  }

}

export { SpeficicationsRepository }
