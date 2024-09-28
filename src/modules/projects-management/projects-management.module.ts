import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { PersistenceModule } from '../../common/modules/persistence';
import {
  CustomersController,
  ProjectsController,
  RolePerProfessionalController,
  RolesController,
  TechnologyPerRoleController,
  TechnologyStackController,
} from './controllers';
import {
  CustomersService,
  ProjectsService,
  RolePerProfessionalService,
  RolesService,
  TechnologyPerRoleService,
  TechnologyStackService,
} from './services';

@Module({
  imports: [
    PersistenceModule,
    RouterModule.register([
      {
        path: 'projects-management',
        module: ProjectsManagementModule,
      },
    ]),
  ],
  controllers: [
    CustomersController,
    ProjectsController,
    RolePerProfessionalController,
    RolesController,
    TechnologyPerRoleController,
    TechnologyStackController,
  ],
  providers: [
    CustomersService,
    ProjectsService,
    RolePerProfessionalService,
    RolesService,
    TechnologyPerRoleService,
    TechnologyStackService,
  ],
})
export class ProjectsManagementModule {}
