// components/Navbar.js
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: '1rem', background: '#fff', marginBottom: '1rem', borderBottom: '1px solid #ddd' }}>
      <Link href="/" style={{ marginRight: '1rem' }}>Home</Link>
      {user ? (
        <>
          <Link href="/dashboard" style={{ marginRight: '1rem' }}>Dashboard</Link>
          <Link href="/profile" style={{ marginRight: '1rem' }}>Profile</Link>
          <a href="#" onClick={logout}>Logout</a>
        </>
      ) : (
        <>
          <Link href="/login" style={{ marginRight: '1rem' }}>Login</Link>
          <Link href="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
