import { AppError } from "@shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let categoriesRepositoryInMemory : CategoriesRepositoryInMemory;
let createCategoryUseCase : CreateCategoryUseCase;

describe('Create Category',() =>{

  beforeEach(()=>{
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory)
  })

  it('should be able to created a new category', async ()=>{
    const category = {
      name: 'Category test',
      description: 'Cateogry desciption test'
    }

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

    expect(categoryCreated).toHaveProperty('id');
  })

  it('should not be able to created a new category with name exists', async ()=>{
    expect(async ()=>{
      const category = {
        name: 'Category test',
        description: 'Cateogry desciption test'
      }

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      });

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      });


    }).rejects.toBeInstanceOf(AppError)
  })
})
