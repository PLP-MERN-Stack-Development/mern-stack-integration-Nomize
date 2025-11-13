import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

export default function Navbar() {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-cyan-300 transition-all duration-300">
            ✨ MyBlog
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Home</Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">About</Link>
            <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Contact</Link>
            {user && (
              <Link to="/create" className="bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-md">
                ✏️ Create Post
              </Link>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-gray-300 text-sm hidden sm:inline">Hi, {user.name}!</span>
              <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Dashboard</Link>
              <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-all duration-200 font-medium shadow-md">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Login</Link>
              <Link to="/register" className="bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 font-medium shadow-md">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
