import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  NotFoundException,
  ParseUUIDPipe,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { MuscleService } from './muscle.service';
import { CreateMuscleDto, MuscleDto, UpdateMuscleDto } from './dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards';

@Controller('muscle')
@UseGuards(AuthGuard)
export class MuscleController {
  constructor(private readonly muscleService: MuscleService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a muscle' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: MuscleDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  create(@Body() createMuscleDto: CreateMuscleDto) {
    return this.muscleService.create(createMuscleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Finds all muscles' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    isArray: true,
    type: MuscleDto,
  })
  findAll() {
    return this.muscleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Finds a muscle with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Muscle ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: MuscleDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Muscle not found',
  })
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const muscle = await this.muscleService.findById(id);
    if (!muscle) {
      throw new NotFoundException('Muscle not found');
    }
    return muscle;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates a muscle with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Muscle ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: MuscleDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Muscle not found',
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateMuscleDto: UpdateMuscleDto
  ) {
    return this.muscleService.update(id, updateMuscleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a muscle with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Muscle ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: MuscleDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Muscle not found',
  })
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.muscleService.delete(id);
  }
}
