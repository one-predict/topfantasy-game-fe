import { FlattenMaps } from 'mongoose';
import { FantasyProject } from '@projects/schemas';

export interface FantasyProjectEntity {
  getId(): string;
  getName(): string;
  getStars(): number;
  getSocialLink(): string;
  getSocialName(): string;
  getImageUrl(): string;
}

export class MongoFantasyProjectEntity implements FantasyProjectEntity {
  constructor(private readonly fantasyProject: FlattenMaps<FantasyProject> & { _id: string }) {}

  public getId() {
    return this.fantasyProject._id;
  }

  public getName() {
    return this.fantasyProject.name;
  }

  public getStars() {
    return this.fantasyProject.stars;
  }

  public getSocialLink() {
    return this.fantasyProject.socialLink;
  }

  public getSocialName() {
    return this.fantasyProject.socialName;
  }

  public getImageUrl() {
    return this.fantasyProject.imageUrl;
  }
}
