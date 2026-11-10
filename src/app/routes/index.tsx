import { createBrowserRouter } from 'react-router';
import { MainLayout } from '../layouts/main-layout';
import { SigninPage } from '@/pages/signin';
import { HomePage } from '@/pages/home';
import { BoardPage } from '@/pages/board';
import { DashboardPage } from '@/pages/dashboard';
import { SkillsPage } from '@/pages/skills';

export const router = createBrowserRouter([
  { path: 'signin', element: <SigninPage /> },
  {
    path: '',
    element: <MainLayout />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'board', element: <BoardPage /> },
      { path: 'skills', element: <SkillsPage /> },
      { path: 'dashboard', element: <DashboardPage /> },
    ],
  },
]);
