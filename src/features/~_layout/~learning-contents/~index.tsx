import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/learning-contents/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_layout/learning-contents/"!</div>;
}
