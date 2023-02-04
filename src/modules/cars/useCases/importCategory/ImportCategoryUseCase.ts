import fs from 'fs';
import { parse } from 'csv-parse'
import { inject,injectable } from 'tsyringe';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory {
  name:string;
  description:string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository:ICategoriesRepository
  ){}

  async loadCategories(file:Express.Multer.File) : Promise<IImportCategory[]> {
    return new Promise((resolve,reject)=>{
      const stream = fs.createReadStream(file.path);
      const categories : IImportCategory[] = [];

      const parseFile = parse();

      stream.pipe(parseFile);

      parseFile.on("data",async (line)=>{
        const [name,description] = line;
        await this.categoriesRepository.create({ name,description });
      }).on("end",()=>{
        resolve(categories)
      }).on("error",(err)=>{
        reject(err)
      });
    })
  }

  async execute(file:Express.Multer.File):Promise<void> {
    await this.loadCategories(file);
  }
}

export { ImportCategoryUseCase }
