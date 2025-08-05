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
import { HealthEntryService } from './health-entry.service';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import {
  HealthEntryDto,
  CreateHealthEntryDto,
  UpdateHealthEntryDto,
} from 'src/health-entry/dto';

@Controller('health-entry')
export class HealthEntryController {
  constructor(private readonly healthEntryService: HealthEntryService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a health entry' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: HealthEntryDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  create(
    @Body()
    createHealthEntryDto: CreateHealthEntryDto
  ) {
    return this.healthEntryService.create(createHealthEntryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Finds all health entries' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    isArray: true,
    type: HealthEntryDto,
  })
  findAll() {
    return this.healthEntryService.findAll();
  }

  @Get('by-user-id/:userId')
  @ApiOperation({
    summary: 'Finds health entries with specified user id',
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
    type: HealthEntryDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  async findByUserId(@Param('userId', new ParseUUIDPipe()) userId: string) {
    return this.healthEntryService.findByUserId(userId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Finds a health entry with specified id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Health entry ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: HealthEntryDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Health entry not found',
  })
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const healthEntry = await this.healthEntryService.findById(id);
    if (!healthEntry) {
      throw new NotFoundException('health entry not found');
    }
    return healthEntry;
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Updates a health entry with specified id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Health entry ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: HealthEntryDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Health entry not found',
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body()
    updateHealthEntryDto: UpdateHealthEntryDto
  ) {
    return this.healthEntryService.update(id, updateHealthEntryDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletes a health entry with specified id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Health entry ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: HealthEntryDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Health entry not found',
  })
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.healthEntryService.delete(id);
  }
}
