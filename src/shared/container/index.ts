import { container } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUserRepository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpeficicationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRepository';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

container.registerSingleton<ICategoriesRepository>("CategoriesRepository",CategoriesRepository);
container.registerSingleton<ISpecificationsRepository>("SpeficicationsRepository",SpeficicationsRepository);
container.registerSingleton<IUsersRepository>("UsersRepository",UsersRepository);
container.registerSingleton<ICarsRepository>("CarsRepository",CarsRepository);
container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository,
);
