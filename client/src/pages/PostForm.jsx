import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { postService, categoryService } from '../services/api';

export default function PostForm() {
  const { id } = useParams();
  const editing = Boolean(id);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  console.log('Current user:', user); // Debug log

  const [values, setValues] = useState({
    title: '',
    content: '',
    categoryId: '',
    featuredImage: null,
  });
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await categoryService.getAllCategories();
      console.log('Categories response:', res);
      // Handle both { data: [...] } and direct array responses
      const cats = Array.isArray(res) ? res : (res.data || []);
      setCategories(cats);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      setCategories([]);
    }
  };

  // Fetch post if editing
  const fetchPost = async () => {
    if (!editing) return;
    try {
      const res = await postService.getPost(id);
      // API may return { success: true, data: post } or raw post
      const post = (res && res.data) ? res.data : res;
      setValues({
        title: post.title || '',
        content: post.content || '',
        categoryId: post.category?._id || post.category || '',
        featuredImage: null, // Cannot edit image for now
      });
    } catch (err) {
      console.error('Failed to fetch post:', err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchPost();
  }, [id]);

  // Validate form
  const validate = () => {
    const err = {};
    if (!values.title.trim()) err.title = 'Title is required';
    else if (values.title.trim().length < 5) err.title = 'Title too short';
    if (!values.content.trim()) err.content = 'Content is required';
    else if (values.content.trim().length < 20) err.content = 'Content too short';
    if (!values.categoryId) err.categoryId = 'Select a category';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // Add new category
  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      const res = await categoryService.createCategory({ name: newCategory.trim() });
      console.log('Create category response:', res);
      // Handle both { data: {...} } and direct object responses
      const newCat = res.data || res;
      setCategories([...categories, newCat]);
      setValues({ ...values, categoryId: newCat._id });
      setNewCategory('');
    } catch (err) {
      console.error('Failed to create category:', err);
      const errorMsg = err.response?.data?.error || err.message;
      alert('Failed to create category: ' + errorMsg);
    }
  };

  // Submit post
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (!user) {
      alert('You must be logged in to create a post.');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('content', values.content);
      formData.append('category', values.categoryId);
      formData.append('author', user.id || user._id); // Use user.id first (from auth payload)
      if (values.featuredImage) formData.append('featuredImage', values.featuredImage);

      if (editing) {
        await postService.updatePost(id, formData);
      } else {
        await postService.createPost(formData);
      }

      navigate('/posts');
    } catch (err) {
      console.error('Failed to save post:', err);
      alert('Failed to save post: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="max-w-2xl mx-auto px-6">
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-6">
            {editing ? '✏️ Edit Your Post' : '✨ Create a New Post'}
          </h2>

          <input
            type="text"
            placeholder="Post Title"
            value={values.title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            className="border-2 border-gray-300 w-full mb-2 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          />
          {errors.title && <p className="text-red-500 text-sm mb-3">{errors.title}</p>}

          <textarea
            placeholder="Write your post content here..."
            value={values.content}
            onChange={(e) => setValues({ ...values, content: e.target.value })}
            className="border-2 border-gray-300 w-full mb-2 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            rows={8}
          />
          {errors.content && <p className="text-red-500 text-sm mb-3">{errors.content}</p>}

          {/* Category selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={values.categoryId}
              onChange={(e) => setValues({ ...values, categoryId: e.target.value })}
              className="border-2 border-gray-300 w-full px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            >
              <option value="">Select a category</option>
              {Array.isArray(categories) &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
            {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>}
          </div>

          {/* Add new category */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Add new category (optional)"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="border-2 border-gray-300 w-full px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            />
            <button
              type="button"
              onClick={handleAddCategory}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-emerald-600 font-medium transition-all duration-200 shadow-md whitespace-nowrap"
            >
              + Add
            </button>
          </div>

          {/* Featured image */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setValues({ ...values, featuredImage: e.target.files[0] })}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-gradient-to-r file:from-blue-500 file:to-cyan-500
                file:text-white
                hover:file:bg-gradient-to-r hover:file:from-blue-600 hover:file:to-cyan-600
                file:cursor-pointer file:transition-all file:duration-200"
            />
            {values.featuredImage && (
              <p className="text-sm text-green-600 mt-2">✅ {values.featuredImage.name}</p>
            )}
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-cyan-600 font-medium transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {loading ? '⏳ Saving...' : editing ? '✅ Save Changes' : '🚀 Create Post'}
          </button>
        </div>
      </div>
    </div>
  );
}
