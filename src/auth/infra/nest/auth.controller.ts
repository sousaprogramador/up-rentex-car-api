import { Controller, Post, Body, Inject } from '@nestjs/common';
import { AuthUserDto } from './dto/auth.dto';
import { AuthPresenter } from './presenter/auth.presenter';
import { AuthUserUseCase, AuthOutput } from '../../application';

@Controller('auth')
export class AuthController {
  @Inject(AuthUserUseCase.UseCase)
  private authUserUseCase: AuthUserUseCase.UseCase;

  @Post('/signin')
  async auth(@Body() authUserDto: AuthUserDto) {
    const output = await this.authUserUseCase.execute(authUserDto);
    return AuthController.authToResponse(output);
  }

  static authToResponse(output: AuthOutput) {
    return new AuthPresenter(output);
  }
}
