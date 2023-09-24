import { JwtService } from '@nestjs/jwt';
import { AuthOutput, AuthOutputMapper } from '../dto/auth.output';
import { AuthRepositoryInterface } from '../../domain/repository';
import { CryptographyInterface } from 'src/auth/domain/cryptography';
import { NotFoundError } from '../../../@seedwork/domain';
import { default as DefaultUseCase } from '../../../@seedwork/application/use-cases';

export namespace AuthUserUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private authRepo: AuthRepositoryInterface,
      private cryptography: CryptographyInterface,
      private jwtService: JwtService,
    ) {}

    async execute(input: Input): Promise<Output> {
      const user = await this.authRepo.findByEmail(input.email);

      if (!user) {
        throw new NotFoundError('User or password incorrect');
      }

      const passwordMatch = await this.cryptography.compare(
        input.password,
        user.password,
      );

      if (!passwordMatch) {
        throw new NotFoundError('Email or password incorrect');
      }

      const token = this.jwtService.sign({
        name: user.name,
        id: user.id,
      });

      return AuthOutputMapper.toOutput(user, token);
    }
  }

  export type Input = {
    email: string;
    password: string;
  };

  export type Output = AuthOutput;
}
export default AuthUserUseCase;
