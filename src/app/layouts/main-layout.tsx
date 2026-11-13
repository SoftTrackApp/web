import { Outlet } from 'react-router';
import { Header } from '@/widgets/header';

export function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
