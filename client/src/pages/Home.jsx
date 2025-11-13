import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import useApi from '../hooks/useApi';
import { postService, categoryService } from '../services/api';

export default function Home() {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [errorPosts, setErrorPosts] = useState(null);
  const [errorCategories, setErrorCategories] = useState(null);

  // Fetch posts
  const fetchPosts = async () => {
    setLoadingPosts(true);
    setErrorPosts(null);
    try {
    const res = await postService.getAllPosts(page, 6, selectedCategory);
    setPosts(res || []); // fallback to empty array
    } catch (err) {
      console.error(err);
      setErrorPosts('Failed to load posts');
      setPosts([]);
    } finally {
      setLoadingPosts(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    setLoadingCategories(true);
    setErrorCategories(null);
    try {
    const res = await categoryService.getAllCategories();
    setCategories(res || []); // fallback to empty array
    } catch (err) {
      console.error(err);
      setErrorCategories('Failed to load categories');
      setCategories([]);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page, selectedCategory]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setPage(1); // reset pagination when category changes
  };

  const handleNextPage = () => setPage(prev => prev + 1);
  const handlePrevPage = () => setPage(prev => Math.max(prev - 1, 1));

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-900 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">✨ Welcome to MyBlog</h1>
          <p className="text-xl text-gray-200 mb-6">Discover inspiring stories, practical knowledge, and insights from our community of passionate writers</p>
          <p className="text-lg text-gray-300 mb-8">
            Whether you're interested in technology trends, lifestyle tips, business strategies, health and wellness, or travel adventures, MyBlog has something for everyone. Dive into our collection of expertly-written articles and grow with our community.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/about" className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
              Learn About Us
            </Link>
            <Link to="/contact" className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">Latest Blog Posts</h2>

      {/* Filter Section */}
      <div className="flex justify-center items-center gap-4 mb-6">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border px-4 py-2 rounded-md"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Post List */}
      {loadingPosts && <p className="text-center">Loading posts...</p>}
      {errorPosts && <p className="text-center text-red-500">{errorPosts}</p>}
      {!loadingPosts && posts.length === 0 && <p className="text-center">No posts found.</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post._id || post.id} post={post} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="bg-gray-200 px-4 py-2 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={handleNextPage}
          className="bg-gray-200 px-4 py-2 rounded-md"
        >
          Next
        </button>
      </div>
      </div>
    </main>
  );
}
