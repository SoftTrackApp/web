import clsx from 'clsx';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export function Input({ icon, className, ...props }: InputProps) {
  return (
    <label
      className={clsx(
        'flex items-center border-2 p-4 border-gray-200 focus-within:border-gray-400',
        className,
      )}
    >
      {icon && <span className="text-gray-400 mr-8">{icon}</span>}

      <input className="font-semibold focus:outline-0 flex-1" {...props} />
    </label>
  );
}
