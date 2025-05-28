import { Button } from '@fluentui/react-components';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <div style={{ columnGap: '15px', display: 'flex' }}>
        <Link to="/">
          {({ isActive }) => {
            return (
              <Button appearance={isActive ? 'primary' : 'subtle'}>
                Dashboard
              </Button>
            );
          }}
        </Link>{' '}
        <Link to="/setting">
          {({ isActive }) => {
            return (
              <Button appearance={isActive ? 'primary' : 'subtle'}>
                Setting
              </Button>
            );
          }}
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
