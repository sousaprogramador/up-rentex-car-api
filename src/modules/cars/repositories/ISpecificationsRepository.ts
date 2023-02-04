import { Category } from "../entities/Category";

interface ICreateSpecificationDTO {
  name:string;
  description:string;
}

interface ISpecificationsRepository {
  findByName(name:string):Promise<Category>;
  list(): Promise<Category[]>;
  create({ name,description }:ICreateSpecificationDTO): Promise<void>;
}

export { ISpecificationsRepository , ICreateSpecificationDTO}
