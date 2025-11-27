import { DownloadIcon } from 'lucide-react';
import type { LearningContent } from '../../../types';
import { handleAxiosError } from '../../../helpers';
import { toast } from 'react-toastify';
import { LearningContentsService } from '../../../services';

type ContentItemCardProps = {
  content: LearningContent;
};

const ContentItemCard = ({ content }: ContentItemCardProps) => {
  const downloadContent = async () => {
    try {
      const { data } = await LearningContentsService.getDownloadUrl({
        id: content._id,
      });
      const { url } = data;
      const a = document.createElement('a');
      a.href = url;
      a.download = content.objectName.split('/').pop() || content.name;
      a.click();
    } catch (error: unknown) {
      handleAxiosError(error, (message) => toast.error(message));
    }
  };

  return (
    <div className="w-full p-4 h-full flex flex-col justify-between border border-tertiary rounded-lg">
      <div className="w-full flex flex-col gap-1">
        <div className="text-sm text-primary font-bold">
          {content.subject.name}
        </div>
        <div className="font-bold text-lg">{content.name}</div>
        <div>{content.description}</div>
        {content.topics.length > 0 && (
          <div className="flex flex-row flex-wrap gap-2">
            {content.topics.map((topic) => {
              return (
                <div className="font-bold text-xs bg-primary rounded-sm px-2 py-1 text-white">
                  {topic.name}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <button
        onClick={() => downloadContent()}
        className="w-full h-fit p-2 flex bg-tertiary hover:bg-tertiary-700 ease-in-out duration-200 text-white cursor-pointer items-center rounded-lg mt-6 justify-between"
      >
        <span>{content.objectName.split('/').pop()}</span>
        <DownloadIcon size={20} />
      </button>
    </div>
  );
};

export default ContentItemCard;
