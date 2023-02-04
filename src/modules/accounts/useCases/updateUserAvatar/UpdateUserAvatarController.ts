import { Response,Request, request } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {

  async handle(resquest:Request,response:Response):Promise<Response>{
    const { id } = request.user;
    const avatar_file = request.file.filename;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({ user_id:id,avatar_file });

    return response.send(204);
  }
}

export { UpdateUserAvatarController }
