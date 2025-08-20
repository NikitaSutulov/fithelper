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
import { StrengthExerciseCompletionService } from './strength-exercise-completion.service';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import {
  StrengthExerciseCompletionDto,
  CreateStrengthExerciseCompletionDto,
  UpdateStrengthExerciseCompletionDto,
} from './dto';
import { AuthGuard } from 'src/auth/guards';

@Controller('strength-exercise-completion')
@UseGuards(AuthGuard)
export class StrengthExerciseCompletionController {
  constructor(
    private readonly strengthExerciseCompletionService: StrengthExerciseCompletionService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Creates a strength exercise completion' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: StrengthExerciseCompletionDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Strength exercise configuration or workout session not found',
  })
  create(
    @Body()
    createStrengthExerciseCompletionDto: CreateStrengthExerciseCompletionDto
  ) {
    return this.strengthExerciseCompletionService.create(
      createStrengthExerciseCompletionDto
    );
  }

  @Get()
  @ApiOperation({ summary: 'Finds all strength exercise completions' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    isArray: true,
    type: StrengthExerciseCompletionDto,
  })
  findAll() {
    return this.strengthExerciseCompletionService.findAll();
  }

  @Get('by-workout-session-id/:workoutSessionId')
  @ApiOperation({
    summary:
      'Finds strength exercise completions with specified workout session id',
  })
  @ApiParam({
    name: 'workoutSessionId',
    required: true,
    description: 'Workout session ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    isArray: true,
    type: StrengthExerciseCompletionDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Workout session not found',
  })
  async findByWorkoutSessionId(
    @Param('workoutSessionId', new ParseUUIDPipe()) workoutSessionId: string
  ) {
    return this.strengthExerciseCompletionService.findByWorkoutSessionId(
      workoutSessionId
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Finds a strength exercise completion with specified id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Strength exercise completion ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: StrengthExerciseCompletionDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Strength exercise completion not found',
  })
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const strengthExerciseCompletion =
      await this.strengthExerciseCompletionService.findById(id);
    if (!strengthExerciseCompletion) {
      throw new NotFoundException('Strength exercise completion not found');
    }
    return strengthExerciseCompletion;
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Updates a strength exercise completion with specified id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Strength exercise completion ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: StrengthExerciseCompletionDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Strength exercise completion not found',
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body()
    updateStrengthExerciseCompletionDto: UpdateStrengthExerciseCompletionDto
  ) {
    return this.strengthExerciseCompletionService.update(
      id,
      updateStrengthExerciseCompletionDto
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletes a strength exercise completion with specified id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Strength exercise completion ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: StrengthExerciseCompletionDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Strength exercise completion not found',
  })
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.strengthExerciseCompletionService.delete(id);
  }
}
