import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import {
  CreateUserUseCase,
  UpdateUserUseCase,
  ListUsersUseCase,
  GetUserUseCase,
  DeleteUserUseCase,
} from '../../application/useCases';
import { CreateUserDto } from './dto/create-user.dto';
import { UserOutput } from '../../application';
import { UserPresenter } from './presenter/user.presenter';
@Controller('users')
export class UsersController {
  @Inject(CreateUserUseCase.UseCase)
  private createUseCase: CreateUserUseCase.UseCase;

  @Inject(UpdateUserUseCase.UseCase)
  private updateUseCase: UpdateUserUseCase.UseCase;

  @Inject(DeleteUserUseCase.UseCase)
  private deleteUseCase: DeleteUserUseCase.UseCase;

  @Inject(GetUserUseCase.UseCase)
  private getUseCase: GetUserUseCase.UseCase;

  @Inject(ListUsersUseCase.UseCase)
  private listUseCase: ListUsersUseCase.UseCase;

  @Get()
  getHello(): any {
    return this.getUseCase.execute({ id: 'fake' });
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const output = await this.createUseCase.execute(createUserDto);
    return UsersController.userToResponse(output);
  }

  static userToResponse(output: UserOutput) {
    return new UserPresenter(output);
  }
}
