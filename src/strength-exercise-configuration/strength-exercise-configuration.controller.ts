import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StrengthExerciseConfigurationService } from './strength-exercise-configuration.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import {
  CreateStrengthExerciseConfigurationDto,
  StrengthExerciseConfigurationDto,
} from './dto';
import {
  AuthGuard,
  StrengthExerciseConfigurationWriteAccessGuard,
} from 'src/auth/guards';
import { StrengthExerciseConfigurationReadAccessGuard } from 'src/auth/guards';

@Controller('strength-exercise-configuration')
@UseGuards(AuthGuard)
export class StrengthExerciseConfigurationController {
  constructor(
    private readonly strengthExerciseConfigurationService: StrengthExerciseConfigurationService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Creates a strength exercise configuration' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: StrengthExerciseConfigurationDto,
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
    type: StrengthExerciseConfigurationDto,
  })
  findAll() {
    return this.strengthExerciseConfigurationService.findAll();
  }

  @Get(':id')
  @UseGuards(StrengthExerciseConfigurationReadAccessGuard)
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
    type: StrengthExerciseConfigurationDto,
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

  @Delete(':id')
  @UseGuards(StrengthExerciseConfigurationWriteAccessGuard)
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
    type: StrengthExerciseConfigurationDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Strength exercise configuration not found',
  })
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.strengthExerciseConfigurationService.delete(id);
  }
}
