import { createFileRoute, redirect } from '@tanstack/react-router';
import SubjectsSection from './subjects-section';
import TopicsSection from './topics-section';

export const Route = createFileRoute('/_layout/manage-contents/')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.authContext.isManager) {
      throw redirect({ to: '/learning-contents' });
    }
  },
});

function RouteComponent() {
  return (
    <div className="w-full flex flex-col gap-10">
      <h1 className="font-bold text-2xl">Learning contents management</h1>
      <SubjectsSection />
      <TopicsSection />
    </div>
  );
}
