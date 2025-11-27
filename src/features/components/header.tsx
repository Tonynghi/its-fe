const Header = () => {
  return (
    <div className="w-dvw h-20 flex flex-row px-10 items-center justify-between">
      <div className="font-bold text-white rounded-sm flex items-center justify-center aspect-square px-2 bg-primary">
        ITS
      </div>
      <div className="flex flex-row relative gap-4">
        <button className="text-primary border-primary border px-4 py-2 font-bold bg-none rounded-lg cursor-pointer hover:bg-primary hover:text-white ease-in-out duration-200">
          Sign up
        </button>
        <button className="bg-primary px-4 py-2 font-bold text-white rounded-lg cursor-pointer hover:bg-primary-700 ease-in-out duration-200">
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Header;
