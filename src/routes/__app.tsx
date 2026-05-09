import { MainLayout } from '@/app/layouts/main-layout';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/__app')({
  component: MainLayout,
});
