import { MailIcon } from 'lucide-react';

const EmailField = () => {
  return (
    <div className="border border-tertiary px-4 py-2 rounded-lg flex flex-row gap-4 items-center">
      <MailIcon />
      <input
        id="email"
        name="email"
        type="email"
        className="outline-none w-full"
      />
    </div>
  );
};

export default EmailField;
