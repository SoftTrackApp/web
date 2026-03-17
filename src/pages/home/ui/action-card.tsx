export interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function ActionCard({ title, description, icon }: ActionCardProps) {
  return (
    <div className="flex p-12 xl:w-147 items-center gap-5 border-4 border-gray-400 hover:bg-gray-100 transition-colors">
      <span className="text-gray-400">{icon}</span>

      <div>
        <h1 className="font-medium text-xl mb-2">{title}</h1>
        <span className="text-gray-600">{description}</span>
      </div>
    </div>
  );
}
