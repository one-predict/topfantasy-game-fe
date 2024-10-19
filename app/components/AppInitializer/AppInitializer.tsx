import { ReactNode, useEffect } from 'react';
import { mockTelegramEnv, parseInitData } from '@telegram-apps/sdk';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import useCurrentUserQuery from '@hooks/queries/useCurrentUserQuery';
import useSignInMutation from '@hooks/mutations/useSignInMutation';
import useAsyncEffect from '@hooks/useAsyncEffect';
import useMyRewardsNotificationsQuery from '@hooks/queries/useMyRewardsNotificationsQuery';
import { SessionProvider } from '@providers/SessionProvider';
import LoadingScreen from '@components/LoadingScreen';
import useDelayedState from '@hooks/useDelayedState';

export interface AppInitializerProps {
  children: ReactNode;
}

if (typeof window !== 'undefined' && import.meta.env.MODE === 'development') {
  const initDataRaw = new URLSearchParams([
    [
      'user',
      JSON.stringify({
        id: -10000,
        first_name: 'Andrew',
        last_name: 'Rogue',
        username: 'rogue',
        language_code: 'en',
        is_premium: true,
        allows_write_to_pm: true,
      }),
    ],
    ['hash', '934710745036d59235978ddef6273fa64c78e154485f1f235fa8a99f84f1b833'],
    ['auth_date', '1716922846'],
    ['start_param', 'debug'],
    ['chat_type', 'sender'],
    ['chat_instance', '8428209589180549439'],
  ]).toString();

  mockTelegramEnv({
    themeParams: {},
    initData: parseInitData(initDataRaw),
    initDataRaw,
    startParam: '66c9d81214a3fd58f9624969',
    version: '7.7',
    platform: 'tdesktop',
  });
}

const LOADING_STATE_DELAY = 1000;

const AppInitializer = ({ children }: AppInitializerProps) => {
  const [loading, setLoading] = useDelayedState(true, LOADING_STATE_DELAY);

  const { data: currentUser } = useCurrentUserQuery();
  const { mutateAsync: signIn } = useSignInMutation();

  const { data: myRewardsNotifications } = useMyRewardsNotificationsQuery({
    enabled: !!currentUser,
  });

  const isCriticalDataLoaded = !!currentUser && !!myRewardsNotifications;

  const launchParams = useLaunchParams(true);

  useAsyncEffect(async () => {
    if (launchParams?.initDataRaw && currentUser === null) {
      await signIn({
        signInMessage: launchParams.initDataRaw,
        referralId: launchParams.startParam || undefined,
      });
    }
  }, [launchParams, currentUser]);

  useEffect(() => {
    setLoading(!isCriticalDataLoaded);
  }, [isCriticalDataLoaded, setLoading]);

  const renderApplication = () => {
    if (loading) {
      return <LoadingScreen />;
    }

    return <>{children}</>;
  };

  return <SessionProvider currentUser={currentUser}>{renderApplication()}</SessionProvider>;
};

export default AppInitializer;
