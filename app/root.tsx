import { Outlet, Links, Meta, Scripts, ScrollRestoration, useMatches } from '@remix-run/react';
import { ReactNode, useMemo } from 'react';
import { SDKProvider } from '@telegram-apps/sdk-react';
import { THEME, TonConnectUIProvider } from '@tonconnect/ui-react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utcPlugin from 'dayjs/plugin/utc';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import { RestApiClient } from '@api/ApiClient';
import { ApiProvider, ApiProviderValue } from '@providers/ApiProvider';
import { HttpAuthApi } from '@api/AuthApi';
import { HttpUserApi } from '@api/UserApi';
import { HttpTournamentApi } from '@api/TournamentApi';
import { HttpGameCardApi } from '@api/GameCardApi';
import { HttpReferralApi } from '@api/ReferralApi';
import { HttpRewardsNotificationApi } from '@api/RewardsNotificationApi';
import { HttpQuestApi } from '@api/QuestApi';
import { PageLayoutWithMenu } from '@components/Layouts';
import LoadingScreen from '@components/LoadingScreen';
import AuthorizedSection from '@components/AuthorizedSection';
import AppInitializer from '@components/AppInitializer';
import TelegramInit from '@components/TelegramInit';

import './styles/global.css';
import './styles/fonts.css';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from '@components/ErrorBoundary';

dayjs.extend(advancedFormat);
dayjs.extend(utcPlugin);

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>OnePredict Telegram Game</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Scripts />
        <ScrollRestoration />
      </body>
    </html>
  );
}

export function HydrateFallback() {
  return (
    <>
      <LoadingScreen progress={0} />
    </>
  );
}

const App = () => {
  const matches = useMatches();
  const match = matches[matches.length - 1];

  const pageBackground = match.handle?.background;

  const queryClient = useMemo(() => {
    return new QueryClient({
      queryCache: new QueryCache({
        onError: (error) => toast.error(error.message),
      }),
      mutationCache: new MutationCache({
        onError: (error) => toast.error(error.message),
      }),
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
          refetchIntervalInBackground: false,
        },
      },
    });
  }, []);

  const services: ApiProviderValue = useMemo(() => {
    const apiClient = new RestApiClient(import.meta.env.VITE_API_URL);

    return {
      authApi: new HttpAuthApi(apiClient),
      userApi: new HttpUserApi(apiClient),
      tournamentApi: new HttpTournamentApi(apiClient),
      gameCardApi: new HttpGameCardApi(apiClient),
      referralApi: new HttpReferralApi(apiClient),
      rewardsNotificationApi: new HttpRewardsNotificationApi(apiClient),
      questApi: new HttpQuestApi(apiClient),
    };
  }, []);

  return (
    <ErrorBoundary>
      <SDKProvider debug>
        <TelegramInit />
        <TonConnectUIProvider
          manifestUrl="https://s3.eu-central-1.amazonaws.com/game.aipick.io/tonconnect-manifest.json"
          uiPreferences={{ theme: THEME.DARK }}
          // actionsConfiguration={{
          //   twaReturnUrl: 'https://t.me/DemoDappWithTonConnectBot/demo',
          // }}
        >
          <QueryClientProvider client={queryClient}>
            <ApiProvider value={services}>
              <AppInitializer>
                <AuthorizedSection>
                  <PageLayoutWithMenu background={pageBackground}>
                    <Outlet />
                  </PageLayoutWithMenu>
                </AuthorizedSection>
                <ToastContainer
                  pauseOnFocusLoss={false}
                  pauseOnHover={false}
                  theme="dark"
                  toastStyle={{ zIndex: 1000000 }}
                  position="top-right"
                />
              </AppInitializer>
            </ApiProvider>
          </QueryClientProvider>
        </TonConnectUIProvider>
      </SDKProvider>
    </ErrorBoundary>
  );
};

export default App;
