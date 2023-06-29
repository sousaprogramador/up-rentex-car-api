import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  Query,
  ParseUUIDPipe,
  Param,
  Put,
  HttpCode,
  Delete,
} from '@nestjs/common';
import {
  CreateUserUseCase,
  UpdateUserUseCase,
  ListUsersUseCase,
  GetUserUseCase,
  DeleteUserUseCase,
} from '../../application/useCases';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserOutput } from '../../application';
import {
  UserCollectionPresenter,
  UserPresenter,
} from './presenter/user.presenter';
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
  async search(@Query() searchParams: SearchUserDto) {
    const output = await this.listUseCase.execute(searchParams);
    return new UserCollectionPresenter(output);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const output = await this.createUseCase.execute(createUserDto);
    return UsersController.userToResponse(output);
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
  ) {
    const output = await this.getUseCase.execute({ id });
    return UsersController.userToResponse(output);
  }

  @Put(':id') //PUT vs PATCH
  async update(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const output = await this.updateUseCase.execute({
      id,
      ...updateUserDto,
    });
    return UsersController.userToResponse(output);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
  ) {
    return this.deleteUseCase.execute({ id });
  }

  static userToResponse(output: UserOutput) {
    return new UserPresenter(output);
  }
}
