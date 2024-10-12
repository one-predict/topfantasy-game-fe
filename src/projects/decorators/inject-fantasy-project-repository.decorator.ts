import { Inject } from '@nestjs/common';
import ProjectsModuleTokens from '@projects/projects.module.tokens';

const InjectFantasyProjectRepository = () => {
  return Inject(ProjectsModuleTokens.Repositories.FantasyProjectRepository);
};

export default InjectFantasyProjectRepository;
