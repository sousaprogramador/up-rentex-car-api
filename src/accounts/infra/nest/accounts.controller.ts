import { Controller, Get } from '@nestjs/common';

@Controller('accounts')
export class AccountsController {
  @Get()
  getHello(): string {
    return 'oi';
  }
}
