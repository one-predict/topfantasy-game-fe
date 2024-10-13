import TournamentPaymentCurrency from '@enums/TournamentPaymentCurrency';
import { ApiClient } from './ApiClient';

export enum TournamentStatus {
  Upcoming = 'upcoming',
  Live = 'live',
  Finished = 'finished',
}

export interface Tournament {
  id: string;
  title: string;
  description: string;
  entryPrice: number;
  staticPrizePool: number;
  participantsCount: number;
  startTimestamp: number;
  endTimestamp: number;
  registrationEndTimestamp: number;
  imageUrl?: string;
  paymentCurrency: TournamentPaymentCurrency;
  availableProjectIds: Array<string>;
}

export interface JoinTournamentParams {
  tournamentId: string;
  selectedProjectIds: string[];
  walletAddress?: string;
}

export interface TournamentParticipant {
  id: string;
  username: string;
  imageUrl: string;
  fantasyPoints: number;
}

export interface TournamentParticipation {
  id: string;
  userId: string;
  tournamentId: string;
  fantasyPoints: number;
  selectedProjectIds: string[];
}

export interface TournamentLeaderboard {
  rankedParticipants: Array<{
    id: string;
    username: string;
    imageUrl: string;
    fantasyPoints: number;
  }>;
}

export interface TournamentApi {
  getLatestTournaments(status?: TournamentStatus): Promise<Tournament[]>;
  getTournamentById(tournamentId: string): Promise<Tournament>;
  getTournamentLeaderboard(tournamentId: string): Promise<TournamentLeaderboard>;
  getTournamentParticipation(tournamentId: string): Promise<TournamentParticipation | null | undefined>;
  getTournamentParticipationRank(tournamentId: string): Promise<number>;
  joinTournament(params: JoinTournamentParams): Promise<void>;
}

export class HttpTournamentApi implements TournamentApi {
  public constructor(private client: ApiClient) {}

  public getLatestTournaments(status?: TournamentStatus) {
    const urlSearchParams = new URLSearchParams();

    if (status) {
      urlSearchParams.append('status', status);
    }

    return this.client.makeCall<Tournament[]>(`/tournaments/latest?${urlSearchParams}`, 'GET');
  }

  public getTournamentById(tournamentId: string) {
    return this.client.makeCall<Tournament>(`/tournaments/${tournamentId}`, 'GET');
  }

  public getTournamentLeaderboard(tournamentId: string) {
    return this.client.makeCall<TournamentLeaderboard>(`/tournaments/${tournamentId}/leaderboard`, 'GET');
  }

  public async getTournamentParticipation(tournamentId: string) {
    const { participation } = await this.client.makeCall<{ participation: TournamentParticipation | null }>(
      `/tournaments/${tournamentId}/participation`,
      'GET',
    );

    return participation;
  }

  public async getTournamentParticipationRank(tournamentId: string) {
    const { rank } = await this.client.makeCall<{ rank: number }>(
      `/tournaments/${tournamentId}/participation/rank`,
      'GET',
    );

    return rank;
  }

  public async joinTournament(params: JoinTournamentParams) {
    await this.client.makeCall<{ success: boolean }>(`/tournaments/${params.tournamentId}/participation`, 'POST', {
      walletAddress: params.walletAddress,
      selectedProjectIds: params.selectedProjectIds,
    });
  }
}
