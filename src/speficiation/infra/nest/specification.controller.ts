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
  CreateSpecificationUseCase,
  UpdateSpecificationUseCase,
  ListSpecificationsUseCase,
  GetSpecificationUseCase,
  DeleteSpecificationUseCase,
} from '../../application/use-cases';
import { CreateSpecificationDto } from './dto/create-specification.dto';
import { SearchSpecificationDto } from './dto/search-specification.dto';
import { UpdateSpecificationDto } from './dto/update-specification.dot';
import { SpecificationOutput } from '../../application';
import {
  SpecificationCollectionPresenter,
  SpecificationPresenter,
} from './presenter/specification.presenter';

@Controller('specifications')
export class SpecificationsController {
  @Inject(CreateSpecificationUseCase.UseCase)
  private createUseCase: CreateSpecificationUseCase.UseCase;

  @Inject(UpdateSpecificationUseCase.UseCase)
  private updateUseCase: UpdateSpecificationUseCase.UseCase;

  @Inject(DeleteSpecificationUseCase.UseCase)
  private deleteUseCase: DeleteSpecificationUseCase.UseCase;

  @Inject(GetSpecificationUseCase.UseCase)
  private getUseCase: GetSpecificationUseCase.UseCase;

  @Inject(ListSpecificationsUseCase.UseCase)
  private listUseCase: ListSpecificationsUseCase.UseCase;

  @Get()
  async search(@Query() searchParams: SearchSpecificationDto) {
    const output = await this.listUseCase.execute(searchParams);
    return new SpecificationCollectionPresenter(output);
  }

  @Post()
  async create(@Body() createSpecificationDto: CreateSpecificationDto) {
    const output = await this.createUseCase.execute(createSpecificationDto);
    return SpecificationsController.userToResponse(output);
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
  ) {
    const output = await this.getUseCase.execute({ id });
    return SpecificationsController.userToResponse(output);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
    @Body() updateSpecificationDto: UpdateSpecificationDto,
  ) {
    const output = await this.updateUseCase.execute({
      id,
      ...updateSpecificationDto,
    });
    return SpecificationsController.userToResponse(output);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
  ) {
    return this.deleteUseCase.execute({ id });
  }

  static userToResponse(output: SpecificationOutput) {
    return new SpecificationPresenter(output);
  }
}
