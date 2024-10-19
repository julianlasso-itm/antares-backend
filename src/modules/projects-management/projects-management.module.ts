import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { PersistenceModule } from '@persistence/persistence.module';
import { CustomersController } from './controllers/customers.controller';
import { ProjectsController } from './controllers/projects.controller';
import { RolePerProfessionalController } from './controllers/role-per-professional.controller';
import { RolesProjectManagementController } from './controllers/roles-project-management.controller';
import { TechnologyPerRoleController } from './controllers/technology-per-role.controller';
import { TechnologyStackController } from './controllers/technology-stack.controller';
import { CustomersService } from './services/customers.service';
import { ProjectsService } from './services/projects.service';
import { RolePerProfessionalService } from './services/role-per-professional.service';
import { RolesProjectManagementService } from './services/roles-project-management.service';
import { TechnologyPerRoleService } from './services/technology-per-role.service';
import { TechnologyStackService } from './services/technology-stack.service';

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
    RolesProjectManagementController,
    TechnologyPerRoleController,
    TechnologyStackController,
  ],
  providers: [
    CustomersService,
    ProjectsService,
    RolePerProfessionalService,
    RolesProjectManagementService,
    TechnologyPerRoleService,
    TechnologyStackService,
  ],
})
export class ProjectsManagementModule {}
