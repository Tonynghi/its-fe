import { useQuery } from '@tanstack/react-query';
import { TopicsService } from '../../../services';
import { PlusIcon } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

const TopicsSection = () => {
  const navigate = useNavigate();

  const { data, isPending } = useQuery({
    queryKey: ['topics'],
    queryFn: () => {
      return TopicsService.getAllTopics({ currentPage: 1, pageSize: 100 });
    },
  });

  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row gap-4 items-center">
          <h2 className="text-xl font-bold">Topics</h2>
          {data && (
            <div className="text-primary">{data.data.totalItems} topics</div>
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            navigate({ to: '/create-topic' });
          }}
          className="bg-primary px-4 py-2 font-bold text-white rounded-lg cursor-pointer hover:bg-primary-700 ease-in-out duration-200 flex flex-row gap-2"
        >
          <PlusIcon />
          <span>Add topic</span>
        </button>
      </div>
      {isPending && (
        <div className="w-full flex items-center justify-center p-6">
          Loading...
        </div>
      )}
      {data && (
        <div className="w-full gap-6 grid grid-cols-6">
          {data.data.results.map((topic) => (
            <div
              key={topic._id}
              className="border border-tertiary rounded-lg p-2 flex flex-col"
            >
              <div className="font-bold text-primary text-xs">
                {topic.subject.name}
              </div>
              <div className="font-bold">{topic.name}</div>
              <div className="text-xs">{topic.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopicsSection;
