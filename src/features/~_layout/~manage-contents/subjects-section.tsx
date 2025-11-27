import { useQuery } from '@tanstack/react-query';
import { SubjectsService } from '../../../services';
import { PlusIcon } from 'lucide-react';

const SubjectsSection = () => {
  const { data, isPending } = useQuery({
    queryKey: ['subjects'],
    queryFn: () => {
      return SubjectsService.getAllSubjects({ currentPage: 1, pageSize: 100 });
    },
  });

  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row gap-4 items-center">
          <h2 className="text-xl font-bold">Subjects</h2>
          {data && (
            <div className="text-primary">{data.data.totalItems} subjects</div>
          )}
        </div>
        <button
          type="button"
          onClick={() => {}}
          className="bg-primary px-4 py-2 font-bold text-white rounded-lg cursor-pointer hover:bg-primary-700 ease-in-out duration-200 flex flex-row"
        >
          <PlusIcon />
          <span>Add subject</span>
        </button>
      </div>
      {isPending && (
        <div className="w-full flex items-center justify-center p-6">
          Loading...
        </div>
      )}
      {data && (
        <div className="w-full gap-6 grid grid-cols-6">
          {data.data.results.map((subject) => (
            <div
              key={subject._id}
              className="border border-tertiary rounded-lg p-2 flex flex-col gap-2"
            >
              <div className="font-bold">{subject.name}</div>
              <div className="text-xs">{subject.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubjectsSection;
