// pages/profile.js
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

const Profile = () => {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div>
        <h1>Profile</h1>
        {user && (
          <div>
            <img src={user.image} alt={user.username} style={{ width: '100px', borderRadius: '50%' }} />
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
