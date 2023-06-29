import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import {
  CreateUserUseCase,
  UpdateUserUseCase,
  ListUsersUseCase,
  GetUserUseCase,
  DeleteUserUseCase,
} from '../../application/useCases';
import { CreateAccountDto } from './dto/create-accounts.dto';
@Controller('accounts')
export class AccountsController {
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
  async create(@Body() createAccountDto: CreateAccountDto) {
    const output = await this.createUseCase.execute(createAccountDto);
    return output;
  }
}
