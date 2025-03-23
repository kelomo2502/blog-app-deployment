// pages/posts/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const PostDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/posts/${id}`)
        .then((res) => res.json())
        .then((data) => setPost(data.post));
    }
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>By: {post.author?.username}</p>
      <p>{post.content}</p>
      <small>{new Date(post.createdAt).toLocaleDateString()}</small>
      {/* Comments section can be added here */}
    </div>
  );
};

export default PostDetail;
