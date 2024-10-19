import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { PersistenceModule } from '@persistence/persistence.module';
import { RolesSecurityController } from './controllers/roles-security.controller';
import { UserPerRoleController } from './controllers/user-per-role.controller';
import { UsersController } from './controllers/users.controller';
import { RolesSecurityService } from './services/roles-security.service';
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
  controllers: [
    RolesSecurityController,
    UsersController,
    UserPerRoleController,
  ],
  providers: [RolesSecurityService, UsersService, UserPerRoleService],
})
export class SecurityModule {}
