import { Router } from "express";
import { userRoutes } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { categoriesRoutes } from "./categories.routes";
import { speficicationsRoutes } from "./specifications.routes";
import { carsRoutes } from "./car.routes";
import { rentalsRoutes } from './rentals.routes';

const router = Router();

router.use('/sessions',authenticateRoutes);
router.use('/users',userRoutes);
router.use('/categories',categoriesRoutes);
router.use('/specifications',speficicationsRoutes);
router.use('/cars',carsRoutes);
router.use('/rentals', rentalsRoutes);



export { router }
