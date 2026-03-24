import { BoardPage } from '@/pages/board';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/board')({
  component: BoardPage,
});
