// pages/dashboard.js
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import PostCard from '../components/PostCard';
import Link from 'next/link';

const Dashboard = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts for the logged in user only
    // This assumes the backend supports filtering posts by author (adjust API accordingly)
    fetch(`http://localhost:5000/api/posts?author=${user._id}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts);
      });
  }, [user]);

  return (
    <ProtectedRoute>
      <div>
        <h1>{user.username}'s Dashboard</h1>
        <Link href="/posts/create"><a>Create New Post</a></Link>
        {posts.length === 0 ? (
          <p>You haven't created any posts yet.</p>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
