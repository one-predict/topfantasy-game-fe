import { createContext, useContext } from 'react';
import { AuthApi } from '@api/AuthApi';
import { UserApi } from '@api/UserApi';
import { TournamentApi } from '@api/TournamentApi';
import { FantasyTargetApi } from '@api/FantasyTargetApi';
import { ReferralApi } from '@api/ReferralApi';
import { RewardsNotificationApi } from '@api/RewardsNotificationApi';
import { QuestApi } from '@api/QuestApi';

export interface ApiProviderValue {
  authApi: AuthApi;
  userApi: UserApi;
  tournamentApi: TournamentApi;
  fantasyTargetApi: FantasyTargetApi;
  referralApi: ReferralApi;
  rewardsNotificationApi: RewardsNotificationApi;
  questApi: QuestApi;
}

export type Services =
  | AuthApi
  | UserApi
  | TournamentApi
  | FantasyTargetApi
  | ReferralApi
  | RewardsNotificationApi
  | QuestApi;

const ApiContext = createContext<ApiProviderValue>({} as ApiProviderValue);

const createServiceHook = <ServiceType extends Services>(serviceName: keyof ApiProviderValue) => {
  return () => {
    const services = useContext(ApiContext);

    return services[serviceName] as ServiceType;
  };
};

export const useAuthApi = createServiceHook<AuthApi>('authApi');
export const useUserApi = createServiceHook<UserApi>('userApi');
export const useTournamentApi = createServiceHook<TournamentApi>('tournamentApi');
export const useFantasyTargetApi = createServiceHook<FantasyTargetApi>('fantasyTargetApi');
export const useReferralApi = createServiceHook<ReferralApi>('referralApi');
export const useRewardsNotificationApi = createServiceHook<RewardsNotificationApi>('rewardsNotificationApi');
export const useQuestApi = createServiceHook<QuestApi>('questApi');

export const ApiProvider = ApiContext.Provider;
