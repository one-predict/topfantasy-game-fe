import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { IsIdentifier } from '@common/class-validators';

export class CreateTournamentParticipationDto {
  @IsNotEmpty()
  @IsIdentifier()
  tournamentId: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  selectedCards: string[];
}

export interface TournamentParticipationDto {
  id: string;
  tournamentId: string;
  userId: string;
  selectedCards: string[];
  points: number;
  walletAddress: string;
}
