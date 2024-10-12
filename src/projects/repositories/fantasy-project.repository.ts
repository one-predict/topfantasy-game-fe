import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectTransactionsManager, TransactionsManager } from '@core';
import { FantasyProject } from '@projects/schemas';
import { FantasyProjectEntity, MongoFantasyProjectEntity } from '@projects/entities';

export interface FantasyProjectRepository {
  find(): Promise<FantasyProjectEntity[]>;
  findByIds(ids: string[]): Promise<FantasyProjectEntity[]>;
  findById(id: string): Promise<FantasyProjectEntity>;
}

@Injectable()
export class MongoFantasyProjectRepository implements FantasyProjectRepository {
  public constructor(
    @InjectModel(FantasyProject.name) private fantasyProjectModel: Model<FantasyProject>,
    @InjectTransactionsManager() private readonly transactionsManager: TransactionsManager,
  ) {}

  public async find() {
    const projects = await this.fantasyProjectModel.find().session(this.transactionsManager.getSession()).lean().exec();

    return projects.map((project) => {
      return new MongoFantasyProjectEntity(project);
    });
  }

  public async findByIds(ids: string[]) {
    const projects = await this.fantasyProjectModel
      .find({ _id: { $in: ids } })
      .session(this.transactionsManager.getSession())
      .lean()
      .exec();

    return projects.map((project) => {
      return new MongoFantasyProjectEntity(project);
    });
  }

  public async findById(id: string) {
    const project = await this.fantasyProjectModel
      .findOne({
        _id: id,
      })
      .lean()
      .session(this.transactionsManager.getSession())
      .exec();

    return project && new MongoFantasyProjectEntity(project);
  }
}
