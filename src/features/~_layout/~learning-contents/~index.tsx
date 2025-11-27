import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { LearningContentsService, SubjectsService } from '../../../services';
import ContentItemCard from './content-item-card';

export const Route = createFileRoute('/_layout/learning-contents/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [search, setSearch] = useState('');
  const [subjectId, setSubjectId] = useState('');

  const { data: subjectData } = useQuery({
    queryKey: [],
    queryFn: () => {
      return SubjectsService.getAllSubjects({ currentPage: 1, pageSize: 100 });
    },
  });

  const { data: learningContentsData, isPending } = useQuery({
    queryKey: [search, subjectId],
    queryFn: () => {
      return LearningContentsService.getAllContents({
        currentPage: 1,
        pageSize: 100,
        search: search !== '' ? search : undefined,
        subjectId: subjectId !== '' ? subjectId : undefined,
      });
    },
  });

  return (
    <div className="flex flex-col w-full gap-6">
      <h1 className="font-bold text-2xl">Learning Contents</h1>
      <div className="flex flex-row w-full gap-6">
        <div className="border w-full border-tertiary px-4 py-2 rounded-lg flex flex-row gap-4 items-center">
          <SearchIcon />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Enter a name to search..."
            className="outline-none w-full"
          />
        </div>
        <select
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          className="border w-80 border-tertiary px-4 py-2 rounded-lg flex flex-row gap-4 items-center appearance-none focus:border-primary focus:ring-primary"
        >
          <option value={''}>All subjects</option>
          {(subjectData?.data.results || []).map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      {isPending ? (
        <div className="w-full">Loading...</div>
      ) : (
        <div className="w-full h-fit grid grid-cols-5 gap-6">
          {(learningContentsData?.data.results || []).map((content) => (
            <ContentItemCard key={content._id} content={content} />
          ))}
        </div>
      )}
    </div>
  );
}
