import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import Header from '../components/Header';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div>
      <Header />
      <div
        style={{
          backgroundColor: '#e8e8e8',
          padding: '50px 70px',
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
