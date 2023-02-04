import { inject, injectable } from 'tsyringe';
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

interface IReqest{
  name:string;
  description:string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository:ICategoriesRepository
    ){
  }

  async execute({name,description}: IReqest ):Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists){
      throw new AppError("Category already Exists!");
    }

    this.categoriesRepository.create({ name , description });
  }
}

export { CreateCategoryUseCase }
