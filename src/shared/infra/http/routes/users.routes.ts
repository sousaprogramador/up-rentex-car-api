import { Router } from "express";
import multer from "multer";
import uploadConfig from '@config/upload';
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const userRoutes = Router();
const uploadAvatar = multer(uploadConfig);
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

userRoutes.post("/",createUserController.handle);
userRoutes.patch("/",ensureAuthenticated,uploadAvatar.single('avatar'),updateUserAvatarController.handle);

export { userRoutes }
