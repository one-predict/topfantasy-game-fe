import { Event } from '@events/types';
import { TournamentParticipationsEventType } from '@tournament';

export interface TournamentParticipationCreatedEventData {
  object: {
    id: string;
    selectedCards: string[];
    tournamentId: string;
    userId: string;
    points: number;
  };
}

export type TournamentParticipationCreatedEvent = Event<
  TournamentParticipationsEventType.TournamentParticipationCreated,
  TournamentParticipationCreatedEventData
>;
