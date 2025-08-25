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
import { WaterPortionService } from './water-portion.service';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import {
  WaterPortionDto,
  CreateWaterPortionDto,
  UpdateWaterPortionDto,
} from './dto';
import { AuthGuard, WaterPortionAccessGuard } from 'src/auth/guards';

@Controller('water-portion')
@UseGuards(AuthGuard)
export class WaterPortionController {
  constructor(private readonly waterPortionService: WaterPortionService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a water portion' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: WaterPortionDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Health entry not found',
  })
  create(@Body() createWaterPortionDto: CreateWaterPortionDto) {
    return this.waterPortionService.create(createWaterPortionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Finds all water portions' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    isArray: true,
    type: WaterPortionDto,
  })
  findAll() {
    return this.waterPortionService.findAll();
  }

  @Get('by-health-entry-id/:healthEntryId')
  @ApiOperation({
    summary: 'Finds water portions with specified health entry id',
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
    type: WaterPortionDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Health entry not found',
  })
  async findByHealthEntryId(
    @Param('healthEntryId', new ParseUUIDPipe()) healthEntryId: string
  ) {
    return this.waterPortionService.findByHealthEntryId(healthEntryId);
  }

  @Get(':id')
  @UseGuards(WaterPortionAccessGuard)
  @ApiOperation({ summary: 'Finds a water portion with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Water portion ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: WaterPortionDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Water portion not found',
  })
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const waterPortion = await this.waterPortionService.findById(id);
    if (!waterPortion) {
      throw new NotFoundException('Water portion not found');
    }
    return waterPortion;
  }

  @Patch(':id')
  @UseGuards(WaterPortionAccessGuard)
  @ApiOperation({
    summary: 'Updates a water portion with specified id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Water portion ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: WaterPortionDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Water portion not found',
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body()
    updateWaterPortionDto: UpdateWaterPortionDto
  ) {
    return this.waterPortionService.update(id, updateWaterPortionDto);
  }

  @Delete(':id')
  @UseGuards(WaterPortionAccessGuard)
  @ApiOperation({ summary: 'Deletes a water portion with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Water portion ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: WaterPortionDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Water portion not found',
  })
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.waterPortionService.delete(id);
  }
}
