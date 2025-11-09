import { Link } from 'react-router-dom';
import { BookOpen, FileText, TrendingUp, PlayCircle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import LessonCard from '../components/LessonCard';
import QuizCard from '../components/QuizCard';
import { dummyLessons, dummyQuizzes, dummyProgress } from '../utils/dummyData';

export default function StudentDashboard() {
  // Filter lessons and quizzes for student's grade (assuming grade 10 for demo)
  const studentGrade = 10;
  const enrolledLessons = dummyLessons.filter((l) => l.grade === studentGrade);
  const enrolledQuizzes = dummyQuizzes.filter((q) => q.grade === studentGrade);
  const progress = dummyProgress.find((p) => p.studentId === '2') || {
    studentId: '2',
    grade: 10,
    lessonsCompleted: 0,
    totalLessons: enrolledLessons.length,
    quizzesCompleted: 0,
    totalQuizzes: enrolledQuizzes.length,
    averageScore: 0,
  };

  const lessonsProgress = (progress.lessonsCompleted / progress.totalLessons) * 100;
  const quizzesProgress = (progress.quizzesCompleted / progress.totalQuizzes) * 100;

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar role="student" />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-red-400 mb-6">Student Dashboard</h1>

        {/* Progress Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-red-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-red-800">Your Progress</h2>
            <TrendingUp className="h-8 w-8 text-red-600" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-600 mb-2">Lessons Completed</p>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-red-600 h-3 rounded-full transition-all"
                    style={{ width: `${lessonsProgress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold text-red-800">
                  {progress.lessonsCompleted}/{progress.totalLessons}
                </span>
              </div>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Quizzes Completed</p>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-600 h-3 rounded-full transition-all"
                    style={{ width: `${quizzesProgress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold text-green-700">
                  {progress.quizzesCompleted}/{progress.totalQuizzes}
                </span>
              </div>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Average Score</p>
              <p className="text-2xl font-bold text-red-800">
                {progress.averageScore > 0 ? `${progress.averageScore}%` : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Enrolled Grades */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-red-300">
          <h2 className="text-xl font-semibold text-red-800 mb-4">Enrolled Grades</h2>
          <div className="flex flex-wrap gap-4">
            <div className="px-4 py-2 bg-red-100 text-red-800 rounded-lg font-semibold">
              Grade {studentGrade}
            </div>
          </div>
        </div>

        {/* Recent Lessons */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-red-400">Your Lessons</h2>
            <Link
              to="/student/lessons"
              className="text-red-400 hover:text-red-300 font-medium"
            >
              View All
            </Link>
          </div>
          {enrolledLessons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledLessons.slice(0, 3).map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-8 text-center border border-red-300">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No lessons available for your grade yet.</p>
            </div>
          )}
        </div>

        {/* Available Quizzes */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-red-400">Available Quizzes</h2>
            <Link
              to="/student/quizzes"
              className="text-red-400 hover:text-red-300 font-medium"
            >
              View All
            </Link>
          </div>
          {enrolledQuizzes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledQuizzes.map((quiz) => (
                <div key={quiz.id} className="bg-white rounded-xl shadow-md p-6 border border-red-300 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <FileText className="h-8 w-8 text-red-600 mb-3" />
                  <h3 className="text-xl font-semibold text-red-800 mb-2">{quiz.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{quiz.description}</p>
                  <Link
                    to={`/quiz/${quiz.id}`}
                    className="inline-flex items-center space-x-2 bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-900 transition"
                  >
                    <PlayCircle className="h-5 w-5" />
                    <span>Start Quiz</span>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-8 text-center border border-red-300">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No quizzes available for your grade yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

