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
import { DishService } from './dish.service';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { DishDto, CreateDishDto, UpdateDishDto } from 'src/dish/dto';

@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a dish' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: DishDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  create(@Body() createDishDto: CreateDishDto) {
    return this.dishService.create(createDishDto);
  }

  @Get()
  @ApiOperation({ summary: 'Finds all dishes' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    isArray: true,
    type: DishDto,
  })
  findAll() {
    return this.dishService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Finds a dish with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Dish ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DishDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Dish not found',
  })
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const dish = await this.dishService.findById(id);
    if (!dish) {
      throw new NotFoundException('Dish not found');
    }
    return dish;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates a dish with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Dish ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DishDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Dish not found',
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateDishDto: UpdateDishDto
  ) {
    return this.dishService.update(id, updateDishDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a dish with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Dish ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DishDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Dish not found',
  })
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.dishService.delete(id);
  }
}
