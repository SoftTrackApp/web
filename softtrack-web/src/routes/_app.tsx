import { Layout } from '@/shared/ui';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app')({
  component: Layout,
});
