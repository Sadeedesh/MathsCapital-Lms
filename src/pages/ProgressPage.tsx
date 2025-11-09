import { TrendingUp, BookOpen, FileText, Award, Trophy } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import ProgressChart from '../components/ProgressChart';
import { dummyProgress, dummyLessons, dummyQuizzes } from '../utils/dummyData';

export default function ProgressPage() {
  // For demo, using student ID '2'
  const studentId = '2';
  const progress = dummyProgress.find((p) => p.studentId === studentId) || {
    studentId: '2',
    grade: 10,
    lessonsCompleted: 0,
    totalLessons: 0,
    quizzesCompleted: 0,
    totalQuizzes: 0,
    averageScore: 0,
    rank: 0,
  };

  // Calculate progress data for charts
  const lessonsData = [
    { name: 'Completed', value: progress.lessonsCompleted },
    { name: 'Remaining', value: progress.totalLessons - progress.lessonsCompleted },
  ];

  const quizzesData = [
    { name: 'Completed', value: progress.quizzesCompleted },
    { name: 'Remaining', value: progress.totalQuizzes - progress.quizzesCompleted },
  ];

  // Mock data for score progression over time
  const scoreProgression = [
    { name: 'Week 1', value: 75 },
    { name: 'Week 2', value: 80 },
    { name: 'Week 3', value: 85 },
    { name: 'Week 4', value: 88 },
    { name: 'Week 5', value: 90 },
  ];

  // Mock data for topic performance
  const topicPerformance = [
    { name: 'Algebra', value: 92 },
    { name: 'Geometry', value: 85 },
    { name: 'Trigonometry', value: 88 },
    { name: 'Calculus', value: 90 },
    { name: 'Statistics', value: 82 },
  ];

  const lessonsProgressPercent = progress.totalLessons > 0 
    ? Math.round((progress.lessonsCompleted / progress.totalLessons) * 100) 
    : 0;
  const quizzesProgressPercent = progress.totalQuizzes > 0 
    ? Math.round((progress.quizzesCompleted / progress.totalQuizzes) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar role="student" />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-red-400 mb-6">Your Progress</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-red-300">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="h-8 w-8 text-red-600" />
              <span className="text-2xl font-bold text-red-800">{lessonsProgressPercent}%</span>
            </div>
            <p className="text-gray-600 text-sm">Lessons Progress</p>
            <p className="text-xs text-gray-500 mt-1">
              {progress.lessonsCompleted} / {progress.totalLessons} completed
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-red-300">
            <div className="flex items-center justify-between mb-2">
              <FileText className="h-8 w-8 text-green-500" />
              <span className="text-2xl font-bold text-green-700">{quizzesProgressPercent}%</span>
            </div>
            <p className="text-gray-600 text-sm">Quizzes Progress</p>
            <p className="text-xs text-gray-500 mt-1">
              {progress.quizzesCompleted} / {progress.totalQuizzes} completed
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-red-300">
            <div className="flex items-center justify-between mb-2">
              <Award className="h-8 w-8 text-yellow-500" />
              <span className="text-2xl font-bold text-yellow-700">
                {progress.averageScore > 0 ? `${progress.averageScore}%` : 'N/A'}
              </span>
            </div>
            <p className="text-gray-600 text-sm">Average Score</p>
            <p className="text-xs text-gray-500 mt-1">Across all quizzes</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-red-300">
            <div className="flex items-center justify-between mb-2">
              <Trophy className="h-8 w-8 text-purple-500" />
              <span className="text-2xl font-bold text-purple-700">
                #{progress.rank || 'N/A'}
              </span>
            </div>
            <p className="text-gray-600 text-sm">Class Rank</p>
            <p className="text-xs text-gray-500 mt-1">Your position</p>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-red-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-red-800">Lessons Progress</h2>
              <TrendingUp className="h-6 w-6 text-red-600" />
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Overall Progress</span>
                  <span className="font-semibold text-red-800">{lessonsProgressPercent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-red-600 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${lessonsProgressPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-red-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-red-800">Quizzes Progress</h2>
              <TrendingUp className="h-6 w-6 text-green-500" />
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Overall Progress</span>
                  <span className="font-semibold text-green-700">{quizzesProgressPercent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-green-600 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${quizzesProgressPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ProgressChart
            data={scoreProgression}
            type="line"
          />
          <ProgressChart
            data={topicPerformance}
            type="bar"
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-red-300">
          <h2 className="text-xl font-semibold text-red-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-red-50 rounded-lg">
              <BookOpen className="h-5 w-5 text-red-800" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">Completed: Introduction to Algebra</p>
                <p className="text-sm text-gray-500">2 days ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
              <FileText className="h-5 w-5 text-green-700" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">Quiz: Algebra Fundamentals - Score: 85%</p>
                <p className="text-sm text-gray-500">3 days ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-red-50 rounded-lg">
              <BookOpen className="h-5 w-5 text-red-800" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">Started: Trigonometry Basics</p>
                <p className="text-sm text-gray-500">5 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

