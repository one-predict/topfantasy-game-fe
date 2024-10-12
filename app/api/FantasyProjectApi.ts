import { ApiClient } from './ApiClient';

export interface FantasyProject {
  id: string;
  name: string;
  imageUrl: string;
  stars: number;
  socialLink: string;
  socialName: string;
}

export interface FantasyProjectApi {
  getProjectsByIds(ids: string[]): Promise<FantasyProject[]>;
}

export class HttpFantasyProjectCardApi implements FantasyProjectApi {
  public constructor(private client: ApiClient) {}

  public getProjectsByIds(ids: string[]): Promise<FantasyProject[]> {
    return this.client.makeCall<FantasyProject[]>(`/fantasy-projects/by-ids-list`, 'POST', { ids });
  }
}
