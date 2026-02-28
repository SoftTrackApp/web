export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="p-4 bg bg-gray-600 text-white font-semibold hover:cursor-pointer hover:bg-gray-700"
      {...props}
    />
  );
}
