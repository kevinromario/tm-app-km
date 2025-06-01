import {
  createRootRoute,
  Outlet,
  useRouterState,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import Header from '../components/Header';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const location = useRouterState({ select: (s) => s.location.pathname });
  const isSettingPage = location.startsWith('/setting');
  return (
    <div>
      <Header />
      <div
        style={{
          backgroundColor: isSettingPage ? undefined : '#e8e8e8',
          padding: isSettingPage ? '10px' : '30px 70px',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '10px',
          }}
        >
          <Outlet />
        </div>
      </div>
      <TanStackRouterDevtools />
    </div>
  );
}
