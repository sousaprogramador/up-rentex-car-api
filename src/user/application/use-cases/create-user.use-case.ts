import { User } from '../../domain/entities';
import UserRepository from '../../domain/repository/user.repository';
import { CryptographyInterface } from '../../domain/cryptography';
import { UserOutput, UserOutputMapper } from '../dto/user-output';
import { default as DefaultUseCase } from '../../../@seedwork/application/use-cases';

export namespace CreateUserUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private userRepo: UserRepository.Repository,
      private cryptography: CryptographyInterface,
    ) {}

    async execute(input: Input): Promise<Output> {
      const password = await this.cryptography.hash(input.password);
      const entity = new User({
        ...input,
        password: password,
      });
      await this.userRepo.insert(entity);
      return UserOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    driver_licenses: string;
    is_active?: boolean;
  };

  export type Output = UserOutput;
}
export default CreateUserUseCase;
