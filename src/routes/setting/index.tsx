import { createFileRoute, HeadContent } from '@tanstack/react-router';

export const Route = createFileRoute('/setting/')({
  head: () => ({
    meta: [
      {
        title: 'Setting',
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <HeadContent />
      <div>Hello "/setting/"!</div>
    </>
  );
}
