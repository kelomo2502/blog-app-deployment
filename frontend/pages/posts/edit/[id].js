// pages/posts/edit/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProtectedRoute from '../../../components/ProtectedRoute';

const EditPost = () => {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/posts/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            title: data.post.title,
            description: data.post.description,
            content: data.post.content,
          });
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (res.ok) {
      router.push('/dashboard');
    } else {
      alert(data.message || 'Error updating post');
    }
  };

  return (
    <ProtectedRoute>
      <div>
        <h1>Edit Post</h1>
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
          <br />
          <textarea name="description" placeholder="Short Description" value={formData.description} onChange={handleChange} required />
          <br />
          <textarea name="content" placeholder="Content" value={formData.content} onChange={handleChange} required />
          <br />
          <button type="submit">Update Post</button>
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default EditPost;
