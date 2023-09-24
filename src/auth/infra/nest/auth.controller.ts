import { Controller, Post, Body, Inject } from '@nestjs/common';
import { AuthUserDto } from './dto/auth.dto';
import { AuthUserUseCase } from '../../application';

@Controller('auth')
export class AuthController {
  @Inject(AuthUserUseCase.UseCase)
  private authUserUseCase: AuthUserUseCase.UseCase;

  @Post()
  async auth(@Body() authUserDto: AuthUserDto) {
    const output = await this.authUserUseCase.execute(authUserDto);
    return output;
  }
}
