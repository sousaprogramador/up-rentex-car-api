import { User } from '../../domain/entities';
import UserRepository from '../../domain/repository/user.repository';
import { UserOutput, UserOutputMapper } from '../dto/user-output';
import { default as DefaultUseCase } from '../../../@seedwork/application/use-cases';

export namespace CreateUserUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepo: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = new User(input);
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
    is_active: boolean;
  };

  export type Output = UserOutput;
}
export default CreateUserUseCase;
