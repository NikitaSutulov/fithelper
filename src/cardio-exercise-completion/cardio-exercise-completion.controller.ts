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
import { CardioExerciseCompletionService } from './cardio-exercise-completion.service';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import {
  CardioExerciseCompletionDto,
  CreateCardioExerciseCompletionDto,
  UpdateCardioExerciseCompletionDto,
} from './dto';
import {
  AuthGuard,
  CardioExerciseCompletionAccessGuard,
} from 'src/auth/guards';

@Controller('cardio-exercise-completion')
@UseGuards(AuthGuard)
export class CardioExerciseCompletionController {
  constructor(
    private readonly cardioExerciseCompletionService: CardioExerciseCompletionService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Creates a cardio exercise completion' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: CardioExerciseCompletionDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Cardio exercise configuration or workout session not found',
  })
  create(
    @Body()
    createCardioExerciseCompletionDto: CreateCardioExerciseCompletionDto
  ) {
    return this.cardioExerciseCompletionService.create(
      createCardioExerciseCompletionDto
    );
  }

  @Get()
  @ApiOperation({ summary: 'Finds all cardio exercise completions' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    isArray: true,
    type: CardioExerciseCompletionDto,
  })
  findAll() {
    return this.cardioExerciseCompletionService.findAll();
  }

  @Get('by-workout-session-id/:workoutSessionId')
  @ApiOperation({
    summary:
      'Finds cardio exercise completions with specified workout session id',
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
    type: CardioExerciseCompletionDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Workout session not found',
  })
  async findByWorkoutSessionId(
    @Param('workoutSessionId', new ParseUUIDPipe()) workoutSessionId: string
  ) {
    return this.cardioExerciseCompletionService.findByWorkoutSessionId(
      workoutSessionId
    );
  }

  @Get(':id')
  @UseGuards(CardioExerciseCompletionAccessGuard)
  @ApiOperation({
    summary: 'Finds a cardio exercise completion with specified id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Cardio exercise completion ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CardioExerciseCompletionDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Cardio exercise completion not found',
  })
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const cardioExerciseCompletion =
      await this.cardioExerciseCompletionService.findById(id);
    if (!cardioExerciseCompletion) {
      throw new NotFoundException('Cardio exercise completion not found');
    }
    return cardioExerciseCompletion;
  }

  @Patch(':id')
  @UseGuards(CardioExerciseCompletionAccessGuard)
  @ApiOperation({
    summary: 'Updates a cardio exercise completion with specified id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Cardio exercise completion ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CardioExerciseCompletionDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Cardio exercise completion not found',
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body()
    updateCardioExerciseCompletionDto: UpdateCardioExerciseCompletionDto
  ) {
    return this.cardioExerciseCompletionService.update(
      id,
      updateCardioExerciseCompletionDto
    );
  }

  @Delete(':id')
  @UseGuards(CardioExerciseCompletionAccessGuard)
  @ApiOperation({
    summary: 'Deletes a cardio exercise completion with specified id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Cardio exercise completion ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CardioExerciseCompletionDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Cardio exercise completion not found',
  })
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.cardioExerciseCompletionService.delete(id);
  }
}
