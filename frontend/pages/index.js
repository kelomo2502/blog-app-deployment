// pages/index.js
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [source, setSource] = useState('db');

  useEffect(() => {
    // Fetch posts from backend API
    fetch('http://localhost:5000/api/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts);
        setSource(data.source);
      });
  }, []);

  return (
    <div>
      <h1>All Posts</h1>
      <p>Data source: {source}</p>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Home;
