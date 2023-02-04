import { inject,injectable } from "tsyringe";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

interface IReqest{
  name:string;
  description:string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationRepository:ISpecificationsRepository
    ){}

  async execute({name,description}: IReqest ):Promise<void> {
    const specificationAlreadyExists = await this.specificationRepository.findByName(name);

    if (specificationAlreadyExists){
      throw new AppError("Specifications already Exists!");
    }

    this.specificationRepository.create({ name , description });
  }
}

export { CreateSpecificationUseCase }
