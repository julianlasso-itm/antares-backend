import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { PersistenceModule } from '../../common/modules/persistence';
import { RolesController, UserPerRoleController } from './controllers';
import { UsersController } from './controllers/users.controller';
import { RolesService } from './services/roles.service';
import { UserPerRoleService } from './services/user-per-role.service';
import { UsersService } from './services/users.service';

@Module({
  imports: [
    PersistenceModule,
    RouterModule.register([
      {
        path: 'security',
        module: SecurityModule,
      },
    ]),
  ],
  controllers: [RolesController, UsersController, UserPerRoleController],
  providers: [RolesService, UsersService, UserPerRoleService],
})
export class SecurityModule {}
