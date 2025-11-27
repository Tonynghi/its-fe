type SubmitButtonProps = {
  label: string;
};

const SubmitButton = ({ label }: SubmitButtonProps) => {
  <button className="bg-primary px-4 py-2 w-fit font-bold text-white rounded-lg cursor-pointer hover:bg-primary-700 ease-in-out duration-200">
    {label}
  </button>;
};

export default SubmitButton;
