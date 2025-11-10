import { Link } from 'react-router-dom';
import { Calendar, GraduationCap } from 'lucide-react';
import { Lesson } from '../types/models';

interface LessonCardProps {
  lesson: Lesson;
}

export default function LessonCard({ lesson }: LessonCardProps) {
  return (
    <Link
      to={`/lesson/${lesson.id}`}
      className="block bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-red-300"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-red-800 mb-2">{lesson.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{lesson.description}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <GraduationCap className="h-3 w-3 mr-1" />
            Grade {lesson.grade}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-300">
            {lesson.curriculum}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-300">
            {lesson.topic}
          </span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{new Date(lesson.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
}

