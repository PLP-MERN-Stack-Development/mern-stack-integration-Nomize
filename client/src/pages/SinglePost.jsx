import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { postService, authService } from '../services/api';

export default function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = authService.getCurrentUser();

  // Fetch single post by ID
  const fetchPost = async () => {
    setLoading(true);
    try {
      const res = await postService.getPost(id);
      setPost(res.data || res); // handle API returning object directly or in res.data
    } catch (err) {
      console.error(err);
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await postService.deletePost(id);
      navigate('/posts'); // redirect after deletion
    } catch (err) {
      console.error(err);
      alert('Failed to delete post');
    }
  };

  if (loading) return <p className="text-center mt-4">Loading post...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;
  if (!post) return <p className="text-center mt-4">Post not found.</p>;

  // Get author ID from post (could be object or string)
  const authorId = typeof post.author === 'object' ? post.author?._id : post.author;
  const isAuthor = user?.id === authorId || user?.id === post.author?.id;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 mb-4">
        Category: {post.category?.name || 'Uncategorized'} | Author: {post.author?.name || 'Unknown'}
      </p>
      <div className="mb-6">
        <p>{post.content}</p>
      </div>

      {isAuthor && (
        <div className="flex gap-2">
          <Link
            to={`/edit/${post._id}`}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      )}

      <div className="mt-6">
        <Link to="/posts" className="text-blue-500">
          ← Back to Posts
        </Link>
      </div>
    </div>
  );
}
