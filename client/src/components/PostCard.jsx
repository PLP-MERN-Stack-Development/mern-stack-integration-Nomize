import { Link } from 'react-router-dom';
import { postService } from '../services/api';

export default function PostCard({ post, onDelete }) {
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await postService.deletePost(post._id);
      if (onDelete) onDelete(); // refresh posts after deletion
    } catch (err) {
      console.error(err);
      alert('Failed to delete post');
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold">{post.title}</h2>
        <p className="text-gray-700">{post.content?.slice(0, 120)}...</p>
      </div>
      <div className="flex gap-2 mt-2">
        <Link to={`/posts/${post._id}`} className="text-blue-500">
          View
        </Link>
        <Link to={`/edit/${post._id}`} className="text-green-600">
          Edit
        </Link>
        <button onClick={handleDelete} className="text-red-600">
          Delete
        </button>
      </div>
    </div>
  );
}
