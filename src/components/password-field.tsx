import { EyeClosedIcon, EyeIcon, LockKeyholeIcon } from 'lucide-react';
import { useState } from 'react';

const PasswordField = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="border border-tertiary px-4 py-2 rounded-lg flex flex-row gap-4 items-center">
      <LockKeyholeIcon />
      <input
        id="password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        className="outline-none w-full"
      />
      <button
        type="button"
        onClick={() => {
          setShowPassword((value) => !value);
        }}
        className="cursor-pointer aspect-square flex items-center justify-center h-full rounded-full bg-none hover:bg-tertiary-300 ease-in-out duration-200"
      >
        {showPassword ? <EyeClosedIcon size={16} /> : <EyeIcon size={16} />}
      </button>
    </div>
  );
};

export default PasswordField;
