import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { postService, authService } from '../services/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  const { data: posts, loading, error, fetchData, deleteItem } = useApi(postService.getAllPosts);

  useEffect(() => {
    if (!user) navigate('/login'); // protect route
    else fetchData(); // load posts
  }, [user, navigate, fetchData]);

  const handleDelete = async (id) => {
    await deleteItem(postService.deletePost, id);
    fetchData(); // refresh list after deletion
  };

  return (
    <main className="max-w-5xl mx-auto p-6">
      {/* Dashboard Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg p-8 mb-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-2">Welcome, {user?.name}! 👋</h1>
        <p className="text-lg text-blue-100 mb-4">This is your personal dashboard where you can manage all your blog posts. Create new posts, edit existing ones, or delete them as needed.</p>
        <div className="bg-white bg-opacity-20 rounded-lg p-4">
          <p className="text-sm font-semibold">MyBlog is your space to share insights, stories, and knowledge with the world. Your posts contribute to our growing community of writers and readers.</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">My Posts</h2>
        <Link
          to="/create"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-semibold"
        >
          ✏️ Create New Post
        </Link>
      </div>

      {loading && <p className="text-center">Loading posts...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="space-y-4">
        {Array.isArray(posts) && posts
          .filter(p => p.authorId === user?.id)
          .map((post) => (
            <div key={post._id || post.id} className="bg-white shadow-md rounded p-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">{post.title}</h2>
                <p className="text-gray-700">{post.content?.slice(0, 120)}...</p>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/edit/${post._id || post.id}`}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post._id || post.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      {!loading && Array.isArray(posts) && posts.filter(p => p.authorId === user?.id).length === 0 && (
        <div className="text-center mt-6 bg-blue-50 p-6 rounded-lg">
          <p className="text-gray-600 mb-4">You have no posts yet. Start creating your first post to share your thoughts with the MyBlog community!</p>
          <Link
            to="/create"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 inline-block font-semibold"
          >
            Create Your First Post
          </Link>
        </div>
      )}
    </main>
  );
}
