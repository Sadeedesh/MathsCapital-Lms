import { Link } from 'react-router-dom';
import { FileText, Calendar, GraduationCap, ArrowRight } from 'lucide-react';
import { Quiz } from '../types/models';

interface QuizCardProps {
  quiz: Quiz;
}

export default function QuizCard({ quiz }: QuizCardProps) {
  return (
    <Link
      to={`/quiz/${quiz.id}`}
      className="block bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-red-300"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-red-800 mb-2">{quiz.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{quiz.description}</p>
          </div>
          <FileText className="h-8 w-8 text-red-600" />
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <GraduationCap className="h-3 w-3 mr-1" />
            Grade {quiz.grade}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-300">
            {quiz.curriculum}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-300">
            {quiz.topic}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            {quiz.questions.length} Questions
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{new Date(quiz.createdAt).toLocaleDateString()}</span>
          </div>
          <ArrowRight className="h-5 w-5 text-red-800" />
        </div>
      </div>
    </Link>
  );
}

