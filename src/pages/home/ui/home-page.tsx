import { useCurrentUser } from '@/entities/user';
import { Link } from '@tanstack/react-router';

export function HomePage() {
  const { user, isPending, error } = useCurrentUser();

  if (isPending) return <span>Loading...</span>;
  if (error) return <span>Error: {error.message}</span>;

  return user ? <span>Welcome, {user.username}!</span> : <Link to="/signin">Sign in</Link>;
}
