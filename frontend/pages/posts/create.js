// pages/posts/create.js
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useRouter } from "next/router";

const CreatePost = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (res.ok) {
      router.push("/dashboard");
    } else {
      alert(data.message || "Error creating post");
    }
  };

  return (
    <ProtectedRoute>
      <div>
        <h1>Create New Post</h1>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <br />
          <textarea
            name="description"
            placeholder="Short Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <br />
          <textarea
            name="content"
            placeholder="Content"
            value={formData.content}
            onChange={handleChange}
            required
          />
          <br />
          <button type="submit">Create Post</button>
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default CreatePost;
