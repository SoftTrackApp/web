import { createBrowserRouter } from 'react-router';
import { MainLayout } from '../layouts/main-layout';
import { SigninPage } from '@/pages/signin';

export const router = createBrowserRouter([
  { path: 'signin', element: <SigninPage /> },
  { path: '', element: <MainLayout />, children: [] },
]);
