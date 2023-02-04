import { Router } from "express";
import { userRoutes } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { categoriesRoutes } from "./categories.routes";
import { speficicationsRoutes } from "./specifications.routes";
import { carRoutes } from "./car.routes";

const router = Router();

router.use('/sessions',authenticateRoutes);
router.use('/users',userRoutes);
router.use('/categories',categoriesRoutes);
router.use('/specifications',speficicationsRoutes);
router.use('/cars',carRoutes);



export { router }
