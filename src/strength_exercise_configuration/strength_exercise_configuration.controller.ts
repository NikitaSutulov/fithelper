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
} from '@nestjs/common';
import { StrengthExerciseConfigurationService } from './strength_exercise_configuration.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { StrengthExerciseConfiguration } from './entities/strength_exercise_configuration.entity';
import {
  CreateStrengthExerciseConfigurationDto,
  UpdateStrengthExerciseConfigurationDto,
} from './dto';

@Controller('strength-exercise-configuration')
export class StrengthExerciseConfigurationController {
  constructor(
    private readonly strengthExerciseConfigurationService: StrengthExerciseConfigurationService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Creates a strength exercise configuration' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: StrengthExerciseConfiguration,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  create(
    @Body()
    createStrengthExerciseConfigurationDto: CreateStrengthExerciseConfigurationDto
  ) {
    return this.strengthExerciseConfigurationService.create(
      createStrengthExerciseConfigurationDto
    );
  }

  @Get()
  @ApiOperation({ summary: 'Finds all strength exercise configurations' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    isArray: true,
    type: StrengthExerciseConfiguration,
  })
  findAll() {
    return this.strengthExerciseConfigurationService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Finds a strength exercise configuration with specified id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Strength exercise configuration ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: StrengthExerciseConfiguration,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Strength exercise configuration not found',
  })
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const strengthExerciseConfiguration =
      await this.strengthExerciseConfigurationService.findById(id);
    if (!strengthExerciseConfiguration) {
      throw new NotFoundException('Strength exercise configuration not found');
    }
    return strengthExerciseConfiguration;
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Updates a strength exercise configuration with specified id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Strength exercise configuration ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: StrengthExerciseConfiguration,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Strength exercise configuration not found',
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body()
    updateStrengthExerciseConfigurationDto: UpdateStrengthExerciseConfigurationDto
  ) {
    return this.strengthExerciseConfigurationService.update(
      id,
      updateStrengthExerciseConfigurationDto
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletes a strength exercise configuration with specified id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Strength exercise configuration ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: StrengthExerciseConfiguration,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Strength exercise configuration not found',
  })
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.strengthExerciseConfigurationService.delete(id);
  }
}
