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
import { PortionService } from './portion.service';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PortionDto, CreatePortionDto, UpdatePortionDto } from './dto';

@Controller('portion')
export class PortionController {
  constructor(private readonly portionService: PortionService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a portion' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: PortionDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Health entry not found',
  })
  create(@Body() createPortionDto: CreatePortionDto) {
    return this.portionService.create(createPortionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Finds all portions' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    isArray: true,
    type: PortionDto,
  })
  findAll() {
    return this.portionService.findAll();
  }

  @Get('by-meal-id/:mealId')
  @ApiOperation({
    summary: 'Finds portions with specified meal id',
  })
  @ApiParam({
    name: 'mealId',
    required: true,
    description: 'Meal ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    isArray: true,
    type: PortionDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Meal not found',
  })
  async findByMealId(@Param('mealId', new ParseUUIDPipe()) mealId: string) {
    return this.portionService.findByMealId(mealId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Finds a portion with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Portion ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: PortionDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Portion not found',
  })
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const portion = await this.portionService.findById(id);
    if (!portion) {
      throw new NotFoundException('Portion not found');
    }
    return portion;
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Updates a portion with specified id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Portion ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: PortionDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Portion not found',
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body()
    updatePortionDto: UpdatePortionDto
  ) {
    return this.portionService.update(id, updatePortionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a portion with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Portion ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: PortionDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Portion not found',
  })
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.portionService.delete(id);
  }
}
