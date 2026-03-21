export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="p-4 bg bg-neutral-700 text-white font-semibold hover:cursor-pointer hover:bg-neutral-800"
      {...props}
    />
  );
}
