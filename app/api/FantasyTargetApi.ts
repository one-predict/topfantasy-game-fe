import FantasyTargetCategory from '@enums/FantasyTargetCategory';
import { ApiClient } from './ApiClient';
import FantasyPointsSource from '@enums/FantasyPointsSource';

export interface FantasyTargetTwitterStatistic {
  tweets: number;
  likes: number;
  views: number;
}

export interface BaseFantasyTarget {
  id: string;
  category: FantasyTargetCategory;
  name: string;
  imageUrl: string;
  stars: number;
  socialLink: string;
  socialName: string;
  fantasyPoints7Days: number;
}

export interface TwitterFantasyTarget extends BaseFantasyTarget {
  pointsSource: FantasyPointsSource.Telegram;
  statistic7Days: FantasyTargetTwitterStatistic;
}

export type FantasyTarget = TwitterFantasyTarget;

export interface FantasyTargetApi {
  getTargetsByCategory(category: FantasyTargetCategory): Promise<FantasyTarget[]>;
  getTargetsByIds(ids: string[]): Promise<FantasyTarget[]>;
}

export class HttpFantasyTargetCardApi implements FantasyTargetApi {
  public constructor(private client: ApiClient) {}

  public getTargetsByCategory(category: string): Promise<FantasyTarget[]> {
    const urlSearchParams = new URLSearchParams();

    urlSearchParams.append('category', category);

    return this.client.makeCall<FantasyTarget[]>(`/fantasy-targets?${urlSearchParams}`);
  }

  public getTargetsByIds(ids: string[]): Promise<FantasyTarget[]> {
    return this.client.makeCall<FantasyTarget[]>(`/fantasy-targets/by-ids-list`, 'POST', { ids });
  }
}
