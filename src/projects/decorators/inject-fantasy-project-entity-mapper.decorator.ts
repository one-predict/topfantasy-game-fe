import { Inject } from '@nestjs/common';
import ProjectsModuleTokens from '@projects/projects.module.tokens';

const InjectFantasyProjectEntityMapper = () => {
  return Inject(ProjectsModuleTokens.EntityMappers.FantasyProjectEntityMapper);
};

export default InjectFantasyProjectEntityMapper;
