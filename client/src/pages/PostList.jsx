import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postService, authService } from '../services/api';

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = authService.getCurrentUser();

  // Fetch posts from API
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await postService.getAllPosts();
      // Make sure res is an array
      setPosts(Array.isArray(res) ? res : res.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await postService.deletePost(id);
      setPosts(posts.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete post');
    }
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Latest Posts</h2>
            <p className="text-gray-600 mt-2">Explore insightful articles and stories</p>
          </div>
          {user && (
            <Link to="/create" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg">
              ✏️ New Post
            </Link>
          )}
        </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg">No posts yet. Be the first to share your story!</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => {
            // Get author ID from post (could be object or string)
            const authorId = typeof post.author === 'object' ? post.author?._id : post.author;
            const isAuthor = user?.id === authorId || user?.id === post.author?.id;
            
            return (
              <li key={post._id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-300">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900 flex-1 hover:text-blue-600 transition-colors">{post.title}</h3>
                    <span className="inline-block bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full ml-2">
                      {post.category?.name || 'Uncategorized'}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-3">
                    By <span className="font-semibold text-gray-700">{post.author?.name || 'Unknown'}</span>
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">{post.content?.slice(0, 120)}{post.content?.length > 120 ? '...' : ''}</p>
                  <div className="flex gap-2 items-center flex-wrap">
                    <Link to={`/posts/${post._id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                      View Post
                    </Link>
                    {isAuthor && (
                      <>
                        <Link to={`/edit/${post._id}`} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      </div>
    </div>
  );
}
