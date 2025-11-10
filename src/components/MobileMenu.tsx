import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, FileText, TrendingUp, LayoutDashboard, Menu, X } from 'lucide-react';

interface MobileMenuProps {
  role: 'teacher' | 'student';
}

export default function MobileMenu({ role }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const studentMenu = [
    { path: '/student', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/student/lessons', label: 'Lessons', icon: BookOpen },
    { path: '/student/quizzes', label: 'Quizzes', icon: FileText },
    { path: '/student/progress', label: 'Progress', icon: TrendingUp },
  ];

  const menu = role === 'student' ? studentMenu : [];

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white hover:text-red-400 transition"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-black border-t border-red-800 z-50">
          <div className="px-4 py-4 space-y-2">
            {menu.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? 'bg-red-800 text-white'
                      : 'text-red-400 hover:bg-red-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}