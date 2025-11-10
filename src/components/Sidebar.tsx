import { Link, useLocation } from 'react-router-dom';
import { BookOpen, FileText, Users, Megaphone, LayoutDashboard, TrendingUp } from 'lucide-react';

interface SidebarProps {
  role: 'teacher' | 'student';
}

export default function Sidebar({ role }: SidebarProps) {
  const location = useLocation();

  const teacherMenu = [
    { path: '/teacher', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/teacher/lessons', label: 'Lessons', icon: BookOpen },
    { path: '/teacher/quizzes', label: 'Quizzes', icon: FileText },
    { path: '/teacher/students', label: 'Students', icon: Users },
    { path: '/teacher/announcements', label: 'Announcements', icon: Megaphone },
  ];

  const studentMenu = [
    { path: '/student', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/student/lessons', label: 'Lessons', icon: BookOpen },
    { path: '/student/quizzes', label: 'Quizzes', icon: FileText },
    { path: '/student/progress', label: 'Progress', icon: TrendingUp },
  ];

  const menu = role === 'teacher' ? teacherMenu : studentMenu;

  return (
    <aside className="hidden lg:block w-64 bg-white shadow-md border-r border-red-300 min-h-screen">
      <div className="p-4">
        <h2 className="text-base lg:text-lg font-semibold text-red-800 mb-4">
          {role === 'teacher' ? 'Teacher' : 'Student'} Menu
        </h2>
        <nav className="space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
                           (item.path !== '/teacher' && item.path !== '/student' && 
                            location.pathname.startsWith(item.path));
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 lg:space-x-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition text-sm lg:text-base ${
                  isActive
                    ? 'bg-red-800 text-white'
                    : 'text-red-800 hover:bg-red-50'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

