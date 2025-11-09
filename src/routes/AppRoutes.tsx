import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { User } from '../types/models';
import Home from '../pages/Home';
import Auth from '../pages/Auth';
import TeacherDashboard from '../pages/TeacherDashboard';
import StudentDashboard from '../pages/StudentDashboard';
import LessonPage from '../pages/LessonPage';
import QuizPage from '../pages/QuizPage';
import ProgressPage from '../pages/ProgressPage';
import Contact from '../pages/Contact';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface AppRoutesProps {
  user: User | null;
  onLogin: (user: User) => void;
  onLogout: () => void;
}

// Layout component for pages with Navbar and Footer
function Layout({ user, onLogout }: { user: User | null; onLogout: () => void }) {
  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <Outlet />
      <Footer />
    </>
  );
}

export default function AppRoutes({ user, onLogin, onLogout }: AppRoutesProps) {
  return (
    <Routes>
      {/* Auth page without Navbar/Footer */}
      <Route path="/auth" element={<Auth onLogin={onLogin} />} />
      
      {/* All other pages with Navbar/Footer */}
      <Route element={<Layout user={user} onLogout={onLogout} />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/teacher"
          element={
            user?.role === 'teacher' ? (
              <TeacherDashboard />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route
          path="/student"
          element={
            user?.role === 'student' ? (
              <StudentDashboard />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route
          path="/lesson/:id"
          element={
            user?.role === 'student' ? (
              <LessonPage />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route
          path="/quiz/:id"
          element={
            user?.role === 'student' ? (
              <QuizPage />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route
          path="/student/progress"
          element={
            user?.role === 'student' ? (
              <ProgressPage />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

