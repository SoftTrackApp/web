import { Layout } from '@/shared/ui/layout';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/__app')({
  component: Layout,
});
