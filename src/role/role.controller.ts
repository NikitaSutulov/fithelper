import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { RoleDto } from './dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @ApiOperation({ summary: 'Finds all roles' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    isArray: true,
    type: RoleDto,
  })
  findAll() {
    return this.roleService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Finds a role with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Role ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: RoleDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Role not found' })
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const role = await this.roleService.findById(id);
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  @Get('/by-name/:name')
  @ApiOperation({ summary: 'Finds a role with specified name' })
  @ApiParam({ name: 'name', required: true, description: 'Role name' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: RoleDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Role not found' })
  async findByName(@Param('name') name: string) {
    const role = await this.roleService.findByName(name);
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }
}
