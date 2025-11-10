import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut, User } from 'lucide-react';
import { User as UserType } from '../types/models';
import MobileMenu from './MobileMenu';

interface NavbarProps {
  user: UserType | null;
  onLogout: () => void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="bg-black shadow-md border-b border-red-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            {user?.role === 'student' && <MobileMenu role="student" />}
            <Link to="/" className="flex items-center space-x-2 text-white hover:text-red-400">
              <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
              <span className="text-lg sm:text-xl font-bold">MathsCapital LMS</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            {user ? (
              <>
                <Link
                  to={user.role === 'teacher' ? '/teacher' : '/student'}
                  className="flex items-center space-x-1 text-white hover:text-red-400 px-2 sm:px-3 py-2 rounded-lg hover:bg-red-900 transition"
                >
                  <User className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-red-400 hover:text-white px-2 sm:px-3 py-2 rounded-lg hover:bg-red-800 transition"
                >
                  <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="bg-red-800 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm sm:text-base"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

