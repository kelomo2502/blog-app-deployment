// components/Navbar.js
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: '1rem', background: '#fff', marginBottom: '1rem', borderBottom: '1px solid #ddd' }}>
      <Link href="/"><a style={{ marginRight: '1rem' }}>Home</a></Link>
      {user ? (
        <>
          <Link href="/dashboard"><a style={{ marginRight: '1rem' }}>Dashboard</a></Link>
          <Link href="/profile"><a style={{ marginRight: '1rem' }}>Profile</a></Link>
          <a href="#" onClick={logout}>Logout</a>
        </>
      ) : (
        <>
          <Link href="/login"><a style={{ marginRight: '1rem' }}>Login</a></Link>
          <Link href="/register"><a>Register</a></Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
