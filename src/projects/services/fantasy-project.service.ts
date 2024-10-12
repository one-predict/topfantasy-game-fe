import { Injectable } from '@nestjs/common';
import { InjectFantasyProjectEntityMapper, InjectFantasyProjectRepository } from '@projects/decorators';
import { FantasyProjectRepository } from '@projects/repositories';
import { FantasyProjectDto } from '@projects/dto';
import { FantasyProjectEntityMapper } from '@projects/entities-mappers';

export interface FantasyProjectService {
  list(): Promise<FantasyProjectDto[]>;
  listForIds(ids: string[]): Promise<FantasyProjectDto[]>;
  getById(id: string): Promise<FantasyProjectDto>;
}

@Injectable()
export class DefaultFantasyProjectService implements FantasyProjectService {
  constructor(
    @InjectFantasyProjectRepository() private readonly fantasyProjectRepository: FantasyProjectRepository,
    @InjectFantasyProjectEntityMapper() private readonly fantasyProjectEntityMapper: FantasyProjectEntityMapper,
  ) {}

  public async list() {
    const projects = await this.fantasyProjectRepository.find();

    return this.fantasyProjectEntityMapper.mapMany(projects);
  }

  public async listForIds(ids: string[]) {
    const projects = await this.fantasyProjectRepository.findByIds(ids);

    return this.fantasyProjectEntityMapper.mapMany(projects);
  }

  public async getById(id: string) {
    const project = await this.fantasyProjectRepository.findById(id);

    return this.fantasyProjectEntityMapper.mapOne(project);
  }
}
