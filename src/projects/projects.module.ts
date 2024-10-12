import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule } from '@core';
import { FantasyProjectSchema, FantasyProject } from './schemas';
import { DefaultFantasyProjectService } from './services';
import { FantasyProjectController } from './controllers';
import { MongoFantasyProjectRepository } from './repositories';
import { DefaultFantasyProjectEntityMapper } from './entities-mappers';
import ProjectsModuleTokens from './projects.module.tokens';

@Module({
  imports: [MongooseModule.forFeature([{ name: FantasyProject.name, schema: FantasyProjectSchema }]), CoreModule],
  controllers: [FantasyProjectController],
  providers: [
    {
      provide: ProjectsModuleTokens.Services.FantasyProjectService,
      useClass: DefaultFantasyProjectService,
    },
    {
      provide: ProjectsModuleTokens.Repositories.FantasyProjectRepository,
      useClass: MongoFantasyProjectRepository,
    },
    {
      provide: ProjectsModuleTokens.EntityMappers.FantasyProjectEntityMapper,
      useClass: DefaultFantasyProjectEntityMapper,
    },
  ],
  exports: [ProjectsModuleTokens.Services.FantasyProjectService],
})
export class ProjectsModule {}
