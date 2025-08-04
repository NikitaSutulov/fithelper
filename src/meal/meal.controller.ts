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
import { MealService } from './meal.service';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { MealDto, CreateMealDto, UpdateMealDto } from 'src/meal/dto';

@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a meal' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: MealDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'HealthEntry not found',
  })
  create(
    @Body()
    createMealDto: CreateMealDto
  ) {
    return this.mealService.create(createMealDto);
  }

  @Get()
  @ApiOperation({ summary: 'Finds all meals' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    isArray: true,
    type: MealDto,
  })
  findAll() {
    return this.mealService.findAll();
  }

  @Get('by-health-entry-id/:healthEntryId')
  @ApiOperation({
    summary: 'Finds meals with specified health entry id',
  })
  @ApiParam({
    name: 'healthEntryId',
    required: true,
    description: 'Health entry ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    isArray: true,
    type: MealDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Health entry not found',
  })
  async findByHealthEntryId(
    @Param('healthEntryId', new ParseUUIDPipe()) healthEntryId: string
  ) {
    return this.mealService.findByHealthEntryId(healthEntryId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Finds a meal with specified id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Meal ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: MealDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Meal not found',
  })
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const meal = await this.mealService.findById(id);
    if (!meal) {
      throw new NotFoundException('Meal not found');
    }
    return meal;
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Updates a meal with specified id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Meal ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: MealDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Meal not found',
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body()
    updateMealDto: UpdateMealDto
  ) {
    return this.mealService.update(id, updateMealDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletes a meal with specified id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Meal ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: MealDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Meal not found',
  })
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.mealService.delete(id);
  }
}
