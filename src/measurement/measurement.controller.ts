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
import { MeasurementService } from './measurement.service';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import {
  MeasurementDto,
  CreateMeasurementDto,
  UpdateMeasurementDto,
} from 'src/measurement/dto';

@Controller('measurement')
export class MeasurementController {
  constructor(private readonly measurementService: MeasurementService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a measurement' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: MeasurementDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  create(
    @Body()
    createMeasurementDto: CreateMeasurementDto
  ) {
    return this.measurementService.create(createMeasurementDto);
  }

  @Get()
  @ApiOperation({ summary: 'Finds all measurements' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    isArray: true,
    type: MeasurementDto,
  })
  findAll() {
    return this.measurementService.findAll();
  }

  @Get('by-user-id/:userId')
  @ApiOperation({
    summary: 'Finds measurements with specified user id',
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'User ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    isArray: true,
    type: MeasurementDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  async findByUserId(@Param('userId', new ParseUUIDPipe()) userId: string) {
    return this.measurementService.findByUserId(userId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Finds a measurement with specified id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Measurement ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: MeasurementDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Measurement not found',
  })
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const measurement = await this.measurementService.findById(id);
    if (!measurement) {
      throw new NotFoundException('Measurement not found');
    }
    return measurement;
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Updates a measurement with specified id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Measurement ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: MeasurementDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Measurement not found',
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body()
    updateMeasurementDto: UpdateMeasurementDto
  ) {
    return this.measurementService.update(id, updateMeasurementDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletes a measurement with specified id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Measurement ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: MeasurementDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Measurement not found',
  })
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.measurementService.delete(id);
  }
}
