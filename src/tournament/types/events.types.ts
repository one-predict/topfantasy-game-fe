import { Event } from '@events/types';
import { TournamentParticipationsEventType } from '@tournament';

export interface TournamentParticipationCreatedEventData {
  object: {
    id: string;
    selectedProjectIds: string[];
    tournamentId: string;
    userId: string;
    fantasyPoints: number;
  };
}

export type TournamentParticipationCreatedEvent = Event<
  TournamentParticipationsEventType.TournamentParticipationCreated,
  TournamentParticipationCreatedEventData
>;
