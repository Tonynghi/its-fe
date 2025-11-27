import { createFileRoute } from '@tanstack/react-router';
import { Header } from './components';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-dvw h-dvh flex flex-col">
      <Header />
      <div className="h-[calc(100dvh-80px)] w-full px-10 py-6 flex flex-row justify-between">
        <div className="flex flex-col gap-10 py-10">
          <div className="flex flex-col relative gap-4">
            <h1 className="font-black text-4xl">Intelligent Tutoring System</h1>
            <div className="text-xl text-primary">
              “Experience learning that adapts to you.”
            </div>
          </div>
          <div className="flex flex-col gap-4 max-w-160">
            <div>
              Learning shouldn’t be one-size-fits-all. Our AI-powered tutor
              analyzes your strengths, identifies your gaps, and tailors every
              lesson to your needs—helping you improve faster and more
              confidently.
            </div>
            <button className="bg-primary px-4 py-2 w-fit font-bold text-white rounded-lg cursor-pointer hover:bg-primary-700 ease-in-out duration-200">
              Start your journey now
            </button>
          </div>
        </div>
        <img
          src="main-bg.jpg"
          className="h-full relative w-160 object-cover rounded-lg"
        />
      </div>
    </div>
  );
}
