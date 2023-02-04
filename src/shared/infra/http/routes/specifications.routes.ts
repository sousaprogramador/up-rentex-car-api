import { Router } from "express";
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "@modules/cars/useCases/listSpecification/ListSpecificationsController";

const speficicationsRoutes = Router();
const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

speficicationsRoutes.post("/",createSpecificationController.handle);
speficicationsRoutes.get("/",listSpecificationsController.handle)

export { speficicationsRoutes };
