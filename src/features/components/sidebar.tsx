import { useNavigate, useRouter } from '@tanstack/react-router';
import { useState, type ReactElement } from 'react';
import classNames from 'classnames';
import { BookOpenTextIcon, FolderKanbanIcon } from 'lucide-react';
import { useUserStore } from '../../stores';
import { Role } from '../../types';

const Sidebar = () => {
  const pathname = useRouter().state.location.pathname;
  const navigate = useNavigate();
  const [currentPathname, setCurrentPathname] = useState(pathname);

  const items = [
    {
      pathname: '/learning-contents',
      icon: <BookOpenTextIcon size={20} />,
    },
    {
      pathname: '/manage-contents',
      icon: <FolderKanbanIcon size={20} />,
      protectedRoute: true,
    },
  ];

  const updatePath = (path: string) => {
    setCurrentPathname(path);
    navigate({ to: path });
  };

  return (
    <div className="relative  flex p-4 flex-col gap-4 bg-white shadow-lg rounded-lg">
      <div className="font-bold text-white rounded-sm flex items-center justify-center aspect-square w-8 bg-primary">
        ITS
      </div>
      {items.map((item) => (
        <SidebarItem
          currentPathname={currentPathname}
          updatePath={updatePath}
          key={item.pathname}
          pathname={item.pathname}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

type SidebarItemProps = {
  currentPathname: string;
  updatePath: (path: string) => void;
  pathname: string;
  icon: ReactElement;
  protectedRoute?: boolean;
};

const SidebarItem = ({
  currentPathname,
  updatePath,
  pathname,
  icon,
  protectedRoute,
}: SidebarItemProps) => {
  const { user } = useUserStore();
  const selected = currentPathname === pathname;

  if (protectedRoute && !(user?.role === Role.TUTOR)) {
    return null;
  }

  return (
    <button
      onClick={() => {
        if (!selected) updatePath(pathname);
      }}
      className={classNames(
        'aspect-square relative rounded-lg w-full flex items-center justify-center ease-in-out duration-200',
        selected
          ? 'bg-tertiary text-white'
          : 'bg-transparent hover:bg-tertiary text-tertiary hover:text-white cursor-pointer',
      )}
    >
      {icon}
    </button>
  );
};

export default Sidebar;
