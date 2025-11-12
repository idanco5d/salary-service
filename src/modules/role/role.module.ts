import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './model/role.schema';
import { RoleCategoryModule } from '../role-category/role-category.module';
import {
  RoleCategory,
  RoleCategorySchema,
} from '../role-category/model/role-category.schema';
import { RoleController } from './controller/role.controller';
import { RoleService } from './service/role.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: RoleCategory.name, schema: RoleCategorySchema },
    ]),
    RoleCategoryModule,
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
