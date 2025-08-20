import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CardioExerciseConfigurationService } from './cardio-exercise-configuration.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import {
  CreateCardioExerciseConfigurationDto,
  CardioExerciseConfigurationDto,
  UpdateCardioExerciseConfigurationDto,
} from './dto';
import {
  AuthGuard,
  CardioExerciseConfigurationAccessGuard,
} from 'src/auth/guards';

@Controller('cardio-exercise-configuration')
@UseGuards(AuthGuard)
export class CardioExerciseConfigurationController {
  constructor(
    private readonly cardioExerciseConfigurationService: CardioExerciseConfigurationService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Creates a cardio exercise configuration' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: CardioExerciseConfigurationDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  create(
    @Body()
    createCardioExerciseConfigurationDto: CreateCardioExerciseConfigurationDto
  ) {
    return this.cardioExerciseConfigurationService.create(
      createCardioExerciseConfigurationDto
    );
  }

  @Get()
  @ApiOperation({ summary: 'Finds all cardio exercise configurations' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    isArray: true,
    type: CardioExerciseConfigurationDto,
  })
  findAll() {
    return this.cardioExerciseConfigurationService.findAll();
  }

  @Get(':id')
  @UseGuards(CardioExerciseConfigurationAccessGuard)
  @ApiOperation({
    summary: 'Finds a cardio exercise configuration with specified id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Cardio exercise configuration ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CardioExerciseConfigurationDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Cardio exercise configuration not found',
  })
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const cardioExerciseConfiguration =
      await this.cardioExerciseConfigurationService.findById(id);
    if (!cardioExerciseConfiguration) {
      throw new NotFoundException('Cardio exercise configuration not found');
    }
    return cardioExerciseConfiguration;
  }

  @Patch(':id')
  @UseGuards(CardioExerciseConfigurationAccessGuard)
  @ApiOperation({
    summary: 'Updates a cardio exercise configuration with specified id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Cardio exercise configuration ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CardioExerciseConfigurationDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Cardio exercise configuration not found',
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body()
    updateCardioExerciseConfigurationDto: UpdateCardioExerciseConfigurationDto
  ) {
    return this.cardioExerciseConfigurationService.update(
      id,
      updateCardioExerciseConfigurationDto
    );
  }

  @Delete(':id')
  @UseGuards(CardioExerciseConfigurationAccessGuard)
  @ApiOperation({
    summary: 'Deletes a cardio exercise configuration with specified id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Cardio exercise configuration ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CardioExerciseConfigurationDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Cardio exercise configuration not found',
  })
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.cardioExerciseConfigurationService.delete(id);
  }
}
