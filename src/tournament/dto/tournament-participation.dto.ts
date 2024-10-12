import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { IsIdentifier } from '@common/class-validators';

export interface TournamentParticipationDto {
  id: string;
  tournamentId: string;
  userId: string;
  selectedCards: string[];
  points: number;
  walletAddress: string;
}
