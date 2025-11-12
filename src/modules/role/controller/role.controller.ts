import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoleDto } from '../model/role.dto';
import { RoleService } from '../service/role.service';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post('add')
  async addRole(@Body() roleDto: RoleDto): Promise<RoleDto> {
    return await this.roleService.addRole(roleDto);
  }

  @Get('category/:categoryName')
  async getAllByCategoryName(
    @Param('categoryName') categoryName: string,
  ): Promise<RoleDto[]> {
    return this.roleService.getAllByCategoryName(categoryName);
  }
}
