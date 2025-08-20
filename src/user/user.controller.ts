import {
  Body,
  ClassSerializerInterceptor,
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
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UserDto } from './dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Finds all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    isArray: true,
    type: UserDto,
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Finds a user with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'User ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: UserDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post()
  @ApiOperation({ summary: 'Creates a user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: UserDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Updates a user with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'User ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: UserDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Deletes a user with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'User ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: UserDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.delete(id);
  }
}
