import { createFileRoute } from '@tanstack/react-router';
import FormBuilder from '../../components/FormBuilder';

export const Route = createFileRoute('/setting/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <FormBuilder />;
}
