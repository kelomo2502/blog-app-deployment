// components/PostCard.js
import Link from 'next/link';

const PostCard = ({ post }) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem', background: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {post.author?.image && (
          <img src={post.author.image} alt={post.author.username} style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '0.5rem' }} />
        )}
        <strong>{post.author?.username}</strong>
      </div>
      <h2>
        <Link href={`/posts/${post._id}`}>
          {post.title}
        </Link>
      </h2>
      <p>{post.description}</p>
      <small>{new Date(post.createdAt).toLocaleDateString()}</small>
    </div>
  );
};

export default PostCard;
