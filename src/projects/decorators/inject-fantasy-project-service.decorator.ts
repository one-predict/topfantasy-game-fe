import { Inject } from '@nestjs/common';
import ProjectsModuleTokens from '@projects/projects.module.tokens';

const InjectFantasyProjectService = () => {
  return Inject(ProjectsModuleTokens.Services.FantasyProjectService);
};

export default InjectFantasyProjectService;
