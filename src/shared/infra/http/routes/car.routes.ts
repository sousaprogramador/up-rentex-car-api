import { Router } from "express";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listCars/ListAvaliableCarsController";

const carRoutes = Router();
const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carRoutes.post("/",createCarController.handle);
carRoutes.get("/available",listAvailableCarsController.handle);

export { carRoutes }
